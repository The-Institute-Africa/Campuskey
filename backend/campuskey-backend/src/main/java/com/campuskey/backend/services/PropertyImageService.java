package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyImageDto;
import com.campuskey.backend.entities.PropertyImage;
import com.campuskey.backend.repositories.PropertyImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyImageService {
    private final PropertyImageRepository propertyImageRepository;

    @Autowired
    public PropertyImageService(PropertyImageRepository propertyImageRepository){
        this.propertyImageRepository=propertyImageRepository;
    }

    public List<PropertyImageDto> getPropertyPictures(){
        return propertyImageRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PropertyImageDto convertToDto(PropertyImage propertyImage){
        PropertyImageDto dto = new PropertyImageDto();
        dto.setId(propertyImage.getId());
        dto.setImageUrl(propertyImage.getImageUrl());

        if (propertyImage.getProperty() != null) {
            dto.setProperty(new PropertyDto(propertyImage.getProperty()));
        }
        return dto;
    }

    public String saveImage(MultipartFile file) throws IOException {
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String uploadDir = "uploads/propertyImages/";
        Path filePath = Paths.get(uploadDir + filename);
        Files.createDirectories(filePath.getParent());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/propertyImages/" + filename;
    }
}
