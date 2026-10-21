package com.campuskey.backend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class VerificationDocumentStorageTest {

    private static final String TEST_KEY = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

    @TempDir
    Path directory;

    @Test
    void storesSupportedDocumentWithGeneratedNameAndLoadsIt() throws Exception {
        VerificationDocumentStorage storage = storage();
        MockMultipartFile upload = new MockMultipartFile(
                "file", "../../private-id.pdf", "application/pdf", "%PDF-1.7 test".getBytes());

        String storedPath = storage.store(upload, "landlord/verification");
        VerificationDocumentStorage.StoredDocument loaded = storage.load(storedPath);

        assertTrue(storedPath.startsWith("landlord/verification/"));
        assertTrue(storedPath.endsWith(".pdf"));
        assertFalse(storedPath.contains("private-id"));
        assertEquals("%PDF-1.7 test", new String(loaded.resource().getInputStream().readAllBytes(),
                StandardCharsets.UTF_8));
        assertEquals("application/pdf", loaded.mediaType().toString());
        assertFalse(Arrays.equals("%PDF-1.7 test".getBytes(StandardCharsets.UTF_8),
                Files.readAllBytes(directory.resolve(storedPath))));
    }

    @Test
    void rejectsUnsupportedContentAndOversizedDocuments() {
        VerificationDocumentStorage storage = storage();
        MockMultipartFile unsupported = new MockMultipartFile(
                "file", "document.pdf", "application/pdf", "not a PDF".getBytes());
        MockMultipartFile oversized = new MockMultipartFile(
                "file", "large.pdf", "application/pdf", new byte[10 * 1024 * 1024 + 1]);

        assertThrows(ResponseStatusException.class, () -> storage.store(unsupported, "property/verification"));
        assertThrows(ResponseStatusException.class, () -> storage.store(oversized, "property/verification"));
    }

    @Test
    void rejectsPathsOutsideStorageRoot() {
        VerificationDocumentStorage storage = storage();

        assertThrows(ResponseStatusException.class, () -> storage.load("../private-id.pdf"));
    }

    @Test
    void encryptsExistingPlaintextVerificationDocuments() throws Exception {
        Path legacyDirectory = directory.resolve("verification");
        Files.createDirectories(legacyDirectory);
        Path legacyDocument = legacyDirectory.resolve("legacy.pdf");
        Files.writeString(legacyDocument, "%PDF-1.4 legacy document");
        VerificationDocumentStorage storage = storage();

        storage.encryptExistingDocuments();

        assertFalse(Arrays.equals("%PDF-1.4 legacy document".getBytes(StandardCharsets.UTF_8),
                Files.readAllBytes(legacyDocument)));
        assertEquals("%PDF-1.4 legacy document", new String(
                storage.load("verification/legacy.pdf").resource().getInputStream().readAllBytes(),
                StandardCharsets.UTF_8));
    }

    @Test
    void rejectsInvalidEncryptionKeys() {
        assertThrows(IllegalStateException.class,
                () -> new VerificationDocumentStorage(directory.toString(), "not-base64"));
        assertThrows(IllegalStateException.class,
                () -> new VerificationDocumentStorage(directory.toString(), "AQID"));
    }

    @Test
    void rejectsDocumentsEncryptedWithAnotherKey() throws Exception {
        VerificationDocumentStorage storage = storage();
        String storedPath = storage.store(new MockMultipartFile(
                "file", "document.pdf", "application/pdf", "%PDF-1.7 test".getBytes()), "verification");
        VerificationDocumentStorage otherKeyStorage = new VerificationDocumentStorage(
                directory.toString(), "AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE=");

        assertThrows(java.io.IOException.class, () -> otherKeyStorage.load(storedPath));
    }

    @Test
    void bindsEncryptedDocumentToItsStoragePath() throws Exception {
        VerificationDocumentStorage storage = storage();
        String firstPath = storage.store(new MockMultipartFile(
                "file", "first.pdf", "application/pdf", "%PDF-1.7 first".getBytes()), "verification");
        String secondPath = storage.store(new MockMultipartFile(
                "file", "second.pdf", "application/pdf", "%PDF-1.7 second".getBytes()), "verification");
        Files.write(directory.resolve(secondPath), Files.readAllBytes(directory.resolve(firstPath)));

        assertThrows(java.io.IOException.class, () -> storage.load(secondPath));
    }

    private VerificationDocumentStorage storage() {
        return new VerificationDocumentStorage(directory.toString(), TEST_KEY);
    }
}
