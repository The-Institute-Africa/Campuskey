package com.campuskey.backend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PublicMediaStorageTest {

    @TempDir
    Path directory;

    @Test
    void storesImagesAndVideosUnderPersistentRootWithGeneratedNames() throws Exception {
        PublicMediaStorage storage = new PublicMediaStorage(directory.toString());
        MockMultipartFile image = new MockMultipartFile(
                "file", "../../photo.png", "image/png",
                new byte[] {(byte) 0x89, 'P', 'N', 'G', 13, 10, 26, 10});
        MockMultipartFile video = new MockMultipartFile(
                "file", "../../clip.mp4", "video/mp4",
                new byte[] {0, 0, 0, 24, 'f', 't', 'y', 'p', 'i', 's', 'o', 'm'});

        String imageUrl = storage.storeImage(image);
        String videoUrl = storage.storeVideo(video);

        assertTrue(imageUrl.startsWith("/uploads/propertyImages/"));
        assertTrue(imageUrl.endsWith(".png"));
        assertTrue(videoUrl.startsWith("/uploads/propertyVideos/"));
        assertTrue(videoUrl.endsWith(".mp4"));
        assertFalse(imageUrl.contains("photo.png"));
        assertFalse(videoUrl.contains("clip.mp4"));
    }

    @Test
    void rejectsMismatchedOrUnsupportedMedia() {
        PublicMediaStorage storage = new PublicMediaStorage(directory.toString());
        MockMultipartFile fakeImage = new MockMultipartFile(
                "file", "photo.png", "image/png", "not an image".getBytes());
        MockMultipartFile fakeVideo = new MockMultipartFile(
                "file", "clip.mp4", "video/mp4", "not a video".getBytes());

        assertThrows(ResponseStatusException.class, () -> storage.storeImage(fakeImage));
        assertThrows(ResponseStatusException.class, () -> storage.storeVideo(fakeVideo));
    }
}
