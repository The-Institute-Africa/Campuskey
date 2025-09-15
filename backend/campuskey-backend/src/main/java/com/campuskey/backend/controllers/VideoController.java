package com.campuskey.backend.controllers;


import com.campuskey.backend.dto.PropertyVideoDto;
import com.campuskey.backend.services.PropertyVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class VideoController {

    private final PropertyVideoService propertyVideoService;
    @Autowired
    public VideoController(PropertyVideoService propertyVideoService){
        this.propertyVideoService = propertyVideoService;
    }

    @GetMapping("videos")
    public List<PropertyVideoDto> getAllVideos(){
        return propertyVideoService.getAllVideos();
    }
}
