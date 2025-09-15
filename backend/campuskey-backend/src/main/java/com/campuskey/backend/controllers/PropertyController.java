package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.services.PropertyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class PropertyController {

    private final PropertyService propertyService;
    private final ObjectMapper objectMapper;

    @Autowired
    public PropertyController(PropertyService propertyService, ObjectMapper objectMapper) {
        this.propertyService = propertyService;
        this.objectMapper = objectMapper;
    }

    // ✅ Get all properties
    @GetMapping("/properties")
    public List<PropertyDto> getProperties() {
        return propertyService.getProperties();
    }

    // ✅ Get property by slug
    @GetMapping("/properties/{slug}")
    public ResponseEntity<PropertyDto> getPropertyBySlug(@PathVariable String slug) {
        return propertyService.getPropertyBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Create new property

    @PostMapping("/properties/create")
    public ResponseEntity<PropertyDto> createProperty(
            @RequestParam("property") String propertyJson,
            @RequestParam(value = "pictures", required = false) List<MultipartFile> pictures,
            @RequestParam(value = "videos", required = false) List<MultipartFile> videos
    ) throws IOException {
        PropertyDto dto = objectMapper.readValue(propertyJson, PropertyDto.class);
        PropertyDto created = propertyService.createProperty(dto, pictures, videos);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ✅ Update existing property
    @PutMapping("/properties/update/{slug}")
    public ResponseEntity<PropertyDto> updateProperty(
            @PathVariable String slug,
            @RequestParam("property") String propertyJson,
            @RequestParam(value = "pictures", required = false) List<MultipartFile> pictures,
            @RequestParam(value = "videos", required = false) List<MultipartFile> videos
    ) throws IOException {
        PropertyDto dto = objectMapper.readValue(propertyJson, PropertyDto.class);
        PropertyDto updated = propertyService.updateProperty(slug, dto, pictures, videos);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete property
    @DeleteMapping("/properties/delete/{slug}")
    public ResponseEntity<Void> deleteProperty(@PathVariable String slug) {
        propertyService.deleteProperty(slug);
        return ResponseEntity.noContent().build();
    }

    //Additional functions

    @GetMapping("/properties/search")
    public ResponseEntity<List<PropertyDto>> searchProperty( @RequestParam(required = false) String Location ,
                                                             @RequestParam(required = false) BigDecimal Price ,
                                                             @RequestParam (required = false) String University){
        List<PropertyDto> propertyDTOs = propertyService.searchProperty(Location,Price,University);

        return ResponseEntity.ok(propertyDTOs);
    }

    @GetMapping("/properties/filter")
    public ResponseEntity<List<PropertyDto>> filterProperty (
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) BigDecimal DistanceFromCampus,
            @RequestParam(required = false)  List<Integer> studentsPerRoom

    ){
        List<PropertyDto> propertyDTOs = propertyService.filterProperty(propertyType,DistanceFromCampus,studentsPerRoom);
        return ResponseEntity.ok(propertyDTOs);
    }
}
