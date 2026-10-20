package com.campuskey.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.PosixFilePermission;
import java.util.EnumSet;
import java.util.Locale;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class VerificationDocumentStorage {

    private static final long MAX_DOCUMENT_SIZE = 10 * 1024 * 1024;

    private final Path root;

    public VerificationDocumentStorage(
            @Value("${campuskey.uploads.directory:uploads}") String uploadDirectory) {
        this.root = Path.of(uploadDirectory).toAbsolutePath().normalize();
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

        String filename = UUID.randomUUID() + extension;
        Path destination = directory.resolve(filename);
        try (var input = file.getInputStream()) {
            Files.copy(input, destination);
        }
        setOwnerOnlyPermissions(destination, false);
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
        if (!normalized.startsWith(root) || !Files.isRegularFile(normalized)) {
            throw new ResponseStatusException(NOT_FOUND, "Verification document not found");
        }

        Path realRoot = root.toRealPath();
        Path realFile = normalized.toRealPath();
        if (!realFile.startsWith(realRoot)) {
            throw new ResponseStatusException(NOT_FOUND, "Verification document not found");
        }

        String filename = realFile.getFileName().toString().toLowerCase(Locale.ROOT);
        MediaType mediaType = filename.endsWith(".pdf") ? MediaType.APPLICATION_PDF
                : filename.endsWith(".png") ? MediaType.IMAGE_PNG
                : filename.endsWith(".jpg") || filename.endsWith(".jpeg") ? MediaType.IMAGE_JPEG
                : MediaType.APPLICATION_OCTET_STREAM;
        return new StoredDocument(new FileSystemResource(realFile), mediaType);
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
