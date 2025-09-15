package com.campuskey.backend.controllers;


import com.campuskey.backend.dto.PropertyUtilityDto;
import com.campuskey.backend.services.PropertyUtilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Set;

@RestController
@RequestMapping("api/v1/campuskey")
public class UtilityController {

    private final PropertyUtilityService propertyUtilityService;

    @Autowired
    public UtilityController(PropertyUtilityService propertyUtilityService){
        this.propertyUtilityService = propertyUtilityService;
    }

    @GetMapping("/utilities")
    public Set<PropertyUtilityDto> getAllUtilities(){
        return propertyUtilityService.getAllUtilities();
    }
}
