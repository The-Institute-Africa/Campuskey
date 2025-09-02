package com.campuskey.backend.controllers;


import com.campuskey.backend.entities.Property;
import com.campuskey.backend.services.propertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class propertyController {

    private final propertyService propertyService ;

    @Autowired
    public propertyController(propertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public List<Property> getProperty(){
        return propertyService.getProperties();
    }
    @DeleteMapping("{propertyId}")
    public void deleteProperty(@PathVariable long propertyId ) throws IllegalAccessException{
        propertyService.deleteProperty(propertyId);

    }

    @PostMapping
    public void addProperty(@RequestBody Property property) throws IllegalAccessException{
         propertyService.addProperty(property);

    }
/*
    @PutMapping("propertyId")
    public void updateProperty(
            @PathVariable("propertyId") long propertyId,
            @RequestParam (required = false ) String name ,
            @RequestParam (required = false ) String price
    ){
        propertyService.updateProperty(propertyId,name,price);
    }*/

}
