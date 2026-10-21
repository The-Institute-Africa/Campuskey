package com.campuskey.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Locale;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class PublicMediaStorage {

    private static final long MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    private static final long MAX_VIDEO_SIZE = 25 * 1024 * 1024;

    private final Path root;

    public PublicMediaStorage(
            @Value("${campuskey.uploads.directory:uploads}") String uploadDirectory) {
        this.root = Path.of(uploadDirectory).toAbsolutePath().normalize();
    }

    public String storeImage(MultipartFile file) throws IOException {
        requireFile(file, MAX_IMAGE_SIZE);
        byte[] signature = readSignature(file, 8);
        String extension;
        if (signature.length >= 3 && (signature[0] & 0xff) == 0xff
                && (signature[1] & 0xff) == 0xd8 && (signature[2] & 0xff) == 0xff) {
            extension = ".jpg";
        } else if (signature.length == 8 && (signature[0] & 0xff) == 0x89
                && signature[1] == 'P' && signature[2] == 'N' && signature[3] == 'G'
                && signature[4] == 13 && signature[5] == 10
                && signature[6] == 26 && signature[7] == 10) {
            extension = ".png";
        } else {
            throw new ResponseStatusException(BAD_REQUEST, "Only JPEG and PNG images are accepted");
        }
        return store(file, "propertyImages", extension);
    }

    public String storeVideo(MultipartFile file) throws IOException {
        requireFile(file, MAX_VIDEO_SIZE);
        byte[] signature = readSignature(file, 12);
        String extension = extension(file);
        if (!".mp4".equals(extension) && !".mov".equals(extension)
                || signature.length < 8
                || signature[4] != 'f' || signature[5] != 't'
                || signature[6] != 'y' || signature[7] != 'p') {
            throw new ResponseStatusException(BAD_REQUEST, "Only MP4 and MOV videos are accepted");
        }
        return store(file, "propertyVideos", extension);
    }

    private String store(MultipartFile file, String category, String extension) throws IOException {
        Path directory = root.resolve(category).normalize();
        if (!directory.startsWith(root)) {
            throw new IllegalArgumentException("Invalid media category");
        }
        Files.createDirectories(directory);
        String filename = UUID.randomUUID() + extension;
        try (var input = file.getInputStream()) {
            Files.copy(input, directory.resolve(filename));
        }
        return "/uploads/" + category + "/" + filename;
    }

    private void requireFile(MultipartFile file, long maxSize) {
        if (file == null || file.isEmpty() || file.getSize() > maxSize) {
            throw new ResponseStatusException(BAD_REQUEST, "Uploaded media is empty or exceeds the allowed size");
        }
    }

    private byte[] readSignature(MultipartFile file, int length) throws IOException {
        try (var input = file.getInputStream()) {
            return input.readNBytes(length);
        }
    }

    private String extension(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null) {
            return "";
        }
        String filename = originalFilename.replace('\\', '/');
        filename = filename.substring(filename.lastIndexOf('/') + 1);
        int dot = filename.lastIndexOf('.');
        return dot < 0 ? "" : filename.substring(dot).toLowerCase(Locale.ROOT);
    }
}
