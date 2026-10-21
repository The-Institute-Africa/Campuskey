package com.campuskey.backend.services;


import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyVideoDto;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyImage;
import com.campuskey.backend.entities.PropertyVideo;
import com.campuskey.backend.repositories.PropertyVideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyVideoService {
    private final PropertyVideoRepository propertyVideoRepository;
    private final PublicMediaStorage mediaStorage;

    @Autowired
    public PropertyVideoService(PropertyVideoRepository propertyVideoRepository, PublicMediaStorage mediaStorage){
        this.propertyVideoRepository = propertyVideoRepository;
        this.mediaStorage = mediaStorage;
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
        return mediaStorage.storeVideo(file);
    }


    public PropertyVideo saveVideoForProperty(Property property, MultipartFile file) throws IOException {

        String videoUrl = saveVideo(file);

        PropertyVideo video = new PropertyVideo();
        video.setVideoUrl(videoUrl);
        video.setProperty(property);

        return propertyVideoRepository.save(video);
    }
}
