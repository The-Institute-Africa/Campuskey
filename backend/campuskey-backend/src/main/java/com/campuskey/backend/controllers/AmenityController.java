package com.campuskey.backend.controllers;


import com.campuskey.backend.dto.PropertyAmenityDto;
import com.campuskey.backend.services.PropertyAmenityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/v1/campuskey")
public class AmenityController {

    private final PropertyAmenityService propertyAmenityService;

    @Autowired
    public AmenityController(PropertyAmenityService propertyAmenityService){
        this.propertyAmenityService = propertyAmenityService;
    }

    @GetMapping("/amenities")
    public Set<PropertyAmenityDto> getAllAmenities(){
        return propertyAmenityService.getAllAmenities();
    }

}
