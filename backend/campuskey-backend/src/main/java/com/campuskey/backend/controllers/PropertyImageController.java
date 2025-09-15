package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.PropertyImageDto;
import com.campuskey.backend.services.PropertyImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")

public class PropertyImageController {
    private final PropertyImageService propertyImageService;

    @Autowired
    public PropertyImageController(PropertyImageService propertyImageService){
        this.propertyImageService = propertyImageService;
    }

    @GetMapping("/images")
    public List<PropertyImageDto> getPropertyPictures(){
        return propertyImageService.getPropertyPictures();
    }

}
