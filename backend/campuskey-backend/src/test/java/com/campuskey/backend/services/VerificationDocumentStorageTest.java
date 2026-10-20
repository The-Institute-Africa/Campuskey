package com.campuskey.backend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class VerificationDocumentStorageTest {

    @TempDir
    Path directory;

    @Test
    void storesSupportedDocumentWithGeneratedNameAndLoadsIt() throws Exception {
        VerificationDocumentStorage storage = new VerificationDocumentStorage(directory.toString());
        MockMultipartFile upload = new MockMultipartFile(
                "file", "../../private-id.pdf", "application/pdf", "%PDF-1.7 test".getBytes());

        String storedPath = storage.store(upload, "landlord/verification");
        VerificationDocumentStorage.StoredDocument loaded = storage.load(storedPath);

        assertTrue(storedPath.startsWith("landlord/verification/"));
        assertTrue(storedPath.endsWith(".pdf"));
        assertFalse(storedPath.contains("private-id"));
        assertEquals("%PDF-1.7 test", Files.readString(loaded.resource().getFile().toPath()));
        assertEquals("application/pdf", loaded.mediaType().toString());
    }

    @Test
    void rejectsUnsupportedContentAndOversizedDocuments() {
        VerificationDocumentStorage storage = new VerificationDocumentStorage(directory.toString());
        MockMultipartFile unsupported = new MockMultipartFile(
                "file", "document.pdf", "application/pdf", "not a PDF".getBytes());
        MockMultipartFile oversized = new MockMultipartFile(
                "file", "large.pdf", "application/pdf", new byte[10 * 1024 * 1024 + 1]);

        assertThrows(ResponseStatusException.class, () -> storage.store(unsupported, "property/verification"));
        assertThrows(ResponseStatusException.class, () -> storage.store(oversized, "property/verification"));
    }

    @Test
    void rejectsPathsOutsideStorageRoot() {
        VerificationDocumentStorage storage = new VerificationDocumentStorage(directory.toString());

        assertThrows(ResponseStatusException.class, () -> storage.load("../private-id.pdf"));
    }
}
