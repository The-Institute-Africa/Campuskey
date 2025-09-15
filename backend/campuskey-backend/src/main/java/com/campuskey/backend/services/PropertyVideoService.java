package com.campuskey.backend.services;


import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyVideoDto;
import com.campuskey.backend.entities.PropertyVideo;
import com.campuskey.backend.repositories.PropertyVideoRepository;
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
public class PropertyVideoService {
    private final PropertyVideoRepository propertyVideoRepository;
    private final String uploadDir = "uploads/propertyVideos/";

    @Autowired
    public PropertyVideoService(PropertyVideoRepository propertyVideoRepository){
        this.propertyVideoRepository = propertyVideoRepository;
    }

    public List<PropertyVideoDto> getAllVideos(){
        return propertyVideoRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PropertyVideoDto convertToDto (PropertyVideo propertyVideo){
        PropertyVideoDto dto = new PropertyVideoDto();
        dto.setId(propertyVideo.getId());
        dto.setVideoUrl(propertyVideo.getVideoUrl());

        if (propertyVideo.getProperty() != null) {
            dto.setProperty(new PropertyDto(propertyVideo.getProperty()));
        }

        return dto;
    }

    public String saveVideo(MultipartFile file) throws IOException {
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + filename);
        Files.createDirectories(filePath.getParent());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/propertyVideos/" + filename;
    }
}
