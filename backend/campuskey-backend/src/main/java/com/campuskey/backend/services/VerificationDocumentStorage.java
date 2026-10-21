package com.campuskey.backend.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.PosixFilePermission;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.EnumSet;
import java.util.Locale;
import java.util.UUID;
import java.util.stream.Stream;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class VerificationDocumentStorage {

    private static final long MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;
    private static final byte[] FILE_HEADER = {'C', 'K', 'D', 'O', 'C', 1};
    private static final int NONCE_SIZE = 12;
    private static final int TAG_SIZE_BITS = 128;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final String TRANSFORMATION = "AES/GCM/NoPadding";
    private static final String ALGORITHM = "AES";

    private final Path root;
    private final SecretKeySpec encryptionKey;

    public VerificationDocumentStorage(
            @Value("${campuskey.uploads.directory:uploads}") String uploadDirectory,
            @Value("${campuskey.documents.encryption-key}") String encodedEncryptionKey) {
        this.root = Path.of(uploadDirectory).toAbsolutePath().normalize();
        this.encryptionKey = parseEncryptionKey(encodedEncryptionKey);
    }

    @PostConstruct
    void encryptExistingDocuments() throws IOException {
        for (String category : new String[]{"verification", "landlord/verification", "property/verification"}) {
            Path directory = root.resolve(category);
            if (!Files.isDirectory(directory, LinkOption.NOFOLLOW_LINKS)) {
                continue;
            }
            try (Stream<Path> paths = Files.walk(directory)) {
                for (Path path : paths.filter(file -> Files.isRegularFile(file, LinkOption.NOFOLLOW_LINKS)).toList()) {
                    byte[] contents = Files.readAllBytes(path);
                    if (!isEncrypted(contents)) {
                        replaceAtomically(path, encrypt(contents, path));
                    }
                }
            }
        }
    }

    public String store(MultipartFile file, String category) throws IOException {
        if (file == null || file.isEmpty() || file.getSize() > MAX_DOCUMENT_SIZE) {
            throw new ResponseStatusException(BAD_REQUEST, "Document must be between 1 byte and 10 MB");
        }

        byte[] signature;
        try (var input = file.getInputStream()) {
            signature = input.readNBytes(8);
        }
        String extension = detectExtension(signature);
        if (extension == null) {
            throw new ResponseStatusException(BAD_REQUEST, "Only PDF, JPEG, and PNG documents are accepted");
        }

        Path directory = root.resolve(category).normalize();
        if (!directory.startsWith(root)) {
            throw new IllegalArgumentException("Invalid document category");
        }
        Files.createDirectories(directory);
        setOwnerOnlyPermissions(directory, true);

        Path destination = directory.resolve(UUID.randomUUID() + extension);
        try (var input = file.getInputStream()) {
            byte[] plaintext = input.readAllBytes();
            replaceAtomically(destination, encrypt(plaintext, destination));
        }
        return root.relativize(destination).toString();
    }

    public StoredDocument load(String storedPath) throws IOException {
        if (storedPath == null || storedPath.isBlank()) {
            throw new ResponseStatusException(NOT_FOUND, "Verification document not found");
        }

        Path candidate = Path.of(storedPath);
        if (!candidate.isAbsolute()) {
            String relative = storedPath.replace('\\', '/');
            if (relative.startsWith("uploads/")) {
                relative = relative.substring("uploads/".length());
            }
            candidate = root.resolve(relative);
        }

        Path normalized = candidate.toAbsolutePath().normalize();
        if (!normalized.startsWith(root) || !Files.isRegularFile(normalized, LinkOption.NOFOLLOW_LINKS)) {
            throw new ResponseStatusException(NOT_FOUND, "Verification document not found");
        }

        Path realRoot = root.toRealPath();
        Path realFile = normalized.toRealPath();
        if (!realFile.startsWith(realRoot)) {
            throw new ResponseStatusException(NOT_FOUND, "Verification document not found");
        }

        byte[] contents = Files.readAllBytes(realFile);
        byte[] plaintext = isEncrypted(contents) ? decrypt(contents, realFile) : contents;
        if (!isEncrypted(contents)) {
            replaceAtomically(realFile, encrypt(contents, realFile));
        }

        String filename = realFile.getFileName().toString().toLowerCase(Locale.ROOT);
        MediaType mediaType = filename.endsWith(".pdf") ? MediaType.APPLICATION_PDF
                : filename.endsWith(".png") ? MediaType.IMAGE_PNG
                : filename.endsWith(".jpg") || filename.endsWith(".jpeg") ? MediaType.IMAGE_JPEG
                : MediaType.APPLICATION_OCTET_STREAM;
        return new StoredDocument(new ByteArrayResource(plaintext), mediaType);
    }

    private byte[] encrypt(byte[] plaintext, Path documentPath) throws IOException {
        try {
            byte[] nonce = new byte[NONCE_SIZE];
            RANDOM.nextBytes(nonce);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, encryptionKey, new GCMParameterSpec(TAG_SIZE_BITS, nonce));
            cipher.updateAAD(documentContext(documentPath));
            byte[] ciphertext = cipher.doFinal(plaintext);

            byte[] encrypted = new byte[FILE_HEADER.length + nonce.length + ciphertext.length];
            System.arraycopy(FILE_HEADER, 0, encrypted, 0, FILE_HEADER.length);
            System.arraycopy(nonce, 0, encrypted, FILE_HEADER.length, nonce.length);
            System.arraycopy(ciphertext, 0, encrypted, FILE_HEADER.length + nonce.length, ciphertext.length);
            return encrypted;
        } catch (GeneralSecurityException exception) {
            throw new IOException("Unable to encrypt verification document", exception);
        }
    }

    private byte[] decrypt(byte[] encrypted, Path documentPath) throws IOException {
        int payloadOffset = FILE_HEADER.length + NONCE_SIZE;
        if (encrypted.length < payloadOffset + 16) {
            throw new IOException("Encrypted verification document is truncated");
        }
        try {
            byte[] nonce = new byte[NONCE_SIZE];
            System.arraycopy(encrypted, FILE_HEADER.length, nonce, 0, nonce.length);
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, encryptionKey, new GCMParameterSpec(TAG_SIZE_BITS, nonce));
            cipher.updateAAD(documentContext(documentPath));
            return cipher.doFinal(encrypted, payloadOffset, encrypted.length - payloadOffset);
        } catch (GeneralSecurityException exception) {
            throw new IOException("Unable to decrypt verification document; check the encryption key or file integrity",
                    exception);
        }
    }

    private boolean isEncrypted(byte[] contents) {
        if (contents.length < FILE_HEADER.length) {
            return false;
        }
        for (int index = 0; index < FILE_HEADER.length; index++) {
            if (contents[index] != FILE_HEADER[index]) {
                return false;
            }
        }
        return true;
    }

    private byte[] documentContext(Path documentPath) {
        return root.relativize(documentPath.toAbsolutePath().normalize()).toString()
                .replace('\\', '/')
                .getBytes(StandardCharsets.UTF_8);
    }

    private void replaceAtomically(Path destination, byte[] contents) throws IOException {
        Path temporary = Files.createTempFile(destination.getParent(), ".campuskey-", ".tmp");
        try {
            setOwnerOnlyPermissions(temporary, false);
            Files.write(temporary, contents);
            try {
                Files.move(temporary, destination, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
            } catch (AtomicMoveNotSupportedException exception) {
                Files.move(temporary, destination, StandardCopyOption.REPLACE_EXISTING);
            }
            setOwnerOnlyPermissions(destination, false);
        } finally {
            Files.deleteIfExists(temporary);
        }
    }

    private SecretKeySpec parseEncryptionKey(String encodedKey) {
        try {
            byte[] key = Base64.getDecoder().decode(encodedKey);
            if (key.length != 32) {
                throw new IllegalStateException("CAMPUSKEY_DOCUMENT_ENCRYPTION_KEY must decode to exactly 32 bytes");
            }
            return new SecretKeySpec(key, ALGORITHM);
        } catch (IllegalArgumentException exception) {
            throw new IllegalStateException("CAMPUSKEY_DOCUMENT_ENCRYPTION_KEY must be valid Base64", exception);
        }
    }

    private String detectExtension(byte[] signature) {
        if (signature.length >= 5 && signature[0] == '%' && signature[1] == 'P'
                && signature[2] == 'D' && signature[3] == 'F' && signature[4] == '-') {
            return ".pdf";
        }
        if (signature.length >= 3 && (signature[0] & 0xff) == 0xff
                && (signature[1] & 0xff) == 0xd8 && (signature[2] & 0xff) == 0xff) {
            return ".jpg";
        }
        if (signature.length == 8 && (signature[0] & 0xff) == 0x89
                && signature[1] == 'P' && signature[2] == 'N' && signature[3] == 'G'
                && signature[4] == 13 && signature[5] == 10
                && signature[6] == 26 && signature[7] == 10) {
            return ".png";
        }
        return null;
    }

    private void setOwnerOnlyPermissions(Path path, boolean directory) throws IOException {
        try {
            Files.setPosixFilePermissions(path, directory
                    ? EnumSet.of(PosixFilePermission.OWNER_READ, PosixFilePermission.OWNER_WRITE,
                            PosixFilePermission.OWNER_EXECUTE)
                    : EnumSet.of(PosixFilePermission.OWNER_READ, PosixFilePermission.OWNER_WRITE));
        } catch (UnsupportedOperationException ignored) {
            // Non-POSIX platforms rely on their default filesystem permissions.
        }
    }

    public record StoredDocument(Resource resource, MediaType mediaType) {
    }
}
