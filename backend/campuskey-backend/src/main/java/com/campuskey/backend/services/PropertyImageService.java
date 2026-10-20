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
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyImageService {

    private final PropertyImageRepository propertyImageRepository;
    private final PublicMediaStorage mediaStorage;

    @Autowired
    public PropertyImageService(PropertyImageRepository propertyImageRepository, PublicMediaStorage mediaStorage) {
        this.propertyImageRepository = propertyImageRepository;
        this.mediaStorage = mediaStorage;
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
        return mediaStorage.storeImage(file);
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
