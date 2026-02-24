package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyImageDto;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyImage;
import com.campuskey.backend.repositories.PropertyImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyImageService {

    private final PropertyImageRepository propertyImageRepository;

    @Autowired
    public PropertyImageService(PropertyImageRepository propertyImageRepository) {
        this.propertyImageRepository = propertyImageRepository;
    }

    public List<PropertyImageDto> getPropertyPictures() {
        return propertyImageRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PropertyImageDto convertToDto(PropertyImage propertyImage) {
        PropertyImageDto dto = new PropertyImageDto();
        dto.setId(propertyImage.getId());
        dto.setImageUrl(propertyImage.getImageUrl());

        if (propertyImage.getProperty() != null) {
            dto.setProperty(new PropertyDto(propertyImage.getProperty()));
        }
        return dto;
    }

    /**
     * Saves the image file to disk and returns the URL path.
     */
    public String saveImage(MultipartFile file) throws IOException {
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String uploadDir = "uploads/propertyImages/";
        Path filePath = Paths.get(uploadDir + filename);
        Files.createDirectories(filePath.getParent());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/propertyImages/" + filename;
    }

    /**
     * ✅ Saves both the file and the database record.
     */
    public PropertyImage saveImageForProperty(Property property, MultipartFile file) throws IOException {
        // 1️⃣ Save file to disk
        String imageUrl = saveImage(file);
        // 2️⃣ Create PropertyImage entity
        PropertyImage image = new PropertyImage();
        image.setImageUrl(imageUrl);
        image.setProperty(property);

        // 3️⃣ Save entity to DB
        return propertyImageRepository.save(image);
    }



}
