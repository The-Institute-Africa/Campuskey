package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyVerificationDto;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.services.PropertyService;
import com.campuskey.backend.services.PropertyVerificationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("api/v1/campuskey")
public class PropertyController {

    private final PropertyService propertyService;
    private final ObjectMapper objectMapper;
    private final PropertyVerificationService verificationService;

    @Autowired
    public PropertyController(PropertyService propertyService, ObjectMapper objectMapper , PropertyVerificationService verificationService) {
        this.verificationService = verificationService;
        this.propertyService = propertyService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/public/properties")
    public List<PropertyDto> getProperties() {
        return propertyService.getProperties();
    }

    @GetMapping("landlord/my-properties")
    public ResponseEntity<List<PropertyDto>> getMyProperties(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();

        List<PropertyDto> properties = propertyService.getPropertiesByUsername(username);

        return ResponseEntity.ok(properties);
    }

    @GetMapping("/public/property/{slug}")
    public ResponseEntity<PropertyDto> getPropertyBySlug(@PathVariable String slug) {
        return propertyService.getPropertyBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping(path = "/landlord/property/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProperty(
            @ModelAttribute PropertyDto propertyDto,
            @RequestParam(value = "pictures", required = false) List<MultipartFile> pictures,
            @RequestParam(value = "videos", required = false) List<MultipartFile> videos,
            @AuthenticationPrincipal UserDetails userDetails
    ) throws IOException {

        String username = userDetails.getUsername();

        PropertyDto created = propertyService.createProperty(username,propertyDto, pictures, videos);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping(
            path = "/landlord/property/update/{slug}" ,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PropertyDto> updateProperty(
            @PathVariable String slug,
            @ModelAttribute PropertyDto propertyDto,
            @RequestParam(value = "pictures", required = false) List<MultipartFile> pictures,
            @RequestParam(value = "videos", required = false) List<MultipartFile> videos ,
            @AuthenticationPrincipal UserDetails userDetails
    ) throws IOException {
        String username = userDetails.getUsername();
        PropertyDto updated = propertyService.updateProperty(username ,slug, propertyDto, pictures, videos);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("landlord/property/delete/{slug}")
    public ResponseEntity<Void> deleteProperty(@PathVariable String slug ,
                                               @AuthenticationPrincipal UserDetails userDetails) {

        String username = userDetails.getUsername();
        propertyService.deleteProperty(slug,username);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/public/properties/search")
    public ResponseEntity<List<PropertyDto>> searchProperty( @RequestParam(required = false) String Location ,
                                                             @RequestParam(required = false) BigDecimal Price ,
                                                             @RequestParam (required = false) String University){
        List<PropertyDto> propertyDTOs = propertyService.searchProperty(Location,Price,University);

        return ResponseEntity.ok(propertyDTOs);
    }

    @GetMapping("/public/properties/filter")
    public ResponseEntity<List<PropertyDto>> filterProperty (
            @RequestParam(required = false) String propertyType,
            @RequestParam(required = false) BigDecimal DistanceFromCampus,
            @RequestParam(required = false)  List<Integer> studentsPerRoom

    ){
        List<PropertyDto> propertyDTOs = propertyService.filterProperty(propertyType,DistanceFromCampus,studentsPerRoom);
        return ResponseEntity.ok(propertyDTOs);
    }

    // ---------- Upload verification document ----------
    @PostMapping("landlord/{propertyId}/submit")
    public ResponseEntity<PropertyVerificationDto> submitDocument(
            @PathVariable Long propertyId,
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserDetails userDetails
    ) throws Exception {
        return ResponseEntity.ok(verificationService.submitDocument(propertyId, file, userDetails.getUsername()));
    }

}
