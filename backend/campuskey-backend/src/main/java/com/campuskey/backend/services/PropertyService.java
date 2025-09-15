package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.entities.*;
import com.campuskey.backend.repositories.*;
import com.campuskey.backend.specification.PropertySpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyImageService propertyImageService;
    private final PropertyVideoService propertyVideoService;
    private final LandlordRepository landlordRepository;
    private final PropertyAmenityRepository propertyAmenityRepository;
    private final PropertyRuleRepository propertyRuleRepository;
    private final PropertyUtilityRepository propertyUtilityRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository,
                           PropertyImageService propertyImageService,
                           PropertyVideoService propertyVideoService,
                           LandlordRepository landlordRepository,
                           PropertyAmenityRepository propertyAmenityRepository,
                           PropertyRuleRepository propertyRuleRepository,
                           PropertyUtilityRepository propertyUtilityRepository) {
        this.propertyRepository = propertyRepository;
        this.propertyImageService = propertyImageService;
        this.propertyVideoService = propertyVideoService;
        this.landlordRepository = landlordRepository;
        this.propertyAmenityRepository = propertyAmenityRepository;
        this.propertyRuleRepository = propertyRuleRepository;
        this.propertyUtilityRepository = propertyUtilityRepository;
    }

    // ✅ Get all properties
    public List<PropertyDto> getProperties() {
        return propertyRepository.findAll()
                .stream()
                .map(PropertyDto::new)
                .collect(Collectors.toList());
    }

    // ✅ Get property by slug
    public Optional<PropertyDto> getPropertyBySlug(String slug) {
        return propertyRepository.findBySlug(slug)
                .map(PropertyDto::new);
    }

    // ✅ Create new property
    public PropertyDto createProperty(PropertyDto dto,
                                      List<MultipartFile> pictures,
                                      List<MultipartFile> videos) throws IOException {
        Property property = buildPropertyFromDto(dto);

        // Save images
        if (pictures != null) {
            for (MultipartFile file : pictures) {
                String imageUrl = propertyImageService.saveImage(file);
                PropertyImage img = new PropertyImage(imageUrl, property);
                property.getImages().add(img);
            }
        }

        // Save videos
        if (videos != null) {
            for (MultipartFile file : videos) {
                String videoUrl = propertyVideoService.saveVideo(file);
                PropertyVideo vid = new PropertyVideo(videoUrl, property);
                property.getVideos().add(vid);
            }
        }

        Property saved = propertyRepository.save(property);
        return new PropertyDto(saved);
    }

    @Transactional
    public PropertyDto updateProperty(String slug,
                                      PropertyDto dto,
                                      List<MultipartFile> pictures,
                                      List<MultipartFile> videos) throws IOException {
        Property property = propertyRepository.findBySlug(slug)
                .orElseThrow(() -> new NoSuchElementException("Property not found with slug: " + slug));

        // Update fields
        property.setName(dto.getName());
        property.setAddress(dto.getAddress());
        property.setDescription(dto.getDescription());
        property.setPropertyType(dto.getPropertyType());
        property.setLocation(dto.getLocation());
        property.setSlug(dto.getSlug());
        property.setPrice(dto.getPrice());
        property.setStudentsPerRoom(dto.getStudentsPerRoom());

        // Update landlord
        landlordRepository.findById(dto.getLandlord().getId())
                .ifPresent(property::setLandlord);

        // Update amenities
        Set<PropertyAmenity> amenities = dto.getAmenities().stream()
                .map(a -> propertyAmenityRepository.findById(a.getId())
                        .orElseThrow(() -> new RuntimeException("Amenity not found: " + a.getId())))
                .collect(Collectors.toSet());
        property.setAmenities(amenities);

        // Update rules
        List<PropertyRule> rules = dto.getRules().stream()
                .map(r -> propertyRuleRepository.findById(r.getId())
                        .orElseThrow(() -> new RuntimeException("Rule not found: " + r.getId())))
                .collect(Collectors.toList());
        property.setPropertyRules(rules);

        // Update utilities
        Set<PropertyUtility> utilities = dto.getUtilities().stream()
                .map(u -> propertyUtilityRepository.findById(u.getId())
                        .orElseThrow(() -> new RuntimeException("Utility not found: " + u.getId())))
                .collect(Collectors.toSet());
        property.setUtilities(utilities);

        // Update images
        if (pictures != null) {
            for (MultipartFile file : pictures) {
                String imageUrl = propertyImageService.saveImage(file);
                PropertyImage img = new PropertyImage(imageUrl, property);
                property.getImages().add(img);
            }
        }

        // Update videos
        if (videos != null) {
            for (MultipartFile file : videos) {
                String videoUrl = propertyVideoService.saveVideo(file);
                PropertyVideo vid = new PropertyVideo(videoUrl, property);
                property.getVideos().add(vid);
            }
        }

        Property updated = propertyRepository.save(property);
        return new PropertyDto(updated);
    }

    @Transactional
    public void deleteProperty(String slug) {
        Property property = propertyRepository.findBySlug(slug)
                .orElseThrow(() -> new NoSuchElementException("Property not found with slug: " + slug));
        propertyRepository.delete(property);
    }

    // 🔹 Utility to build entity from DTO
    private Property buildPropertyFromDto(PropertyDto dto) {
        Property property = new Property(dto);

        landlordRepository.findById(dto.getLandlord().getId())
                .ifPresent(property::setLandlord);

        Set<PropertyAmenity> amenities = dto.getAmenities().stream()
                .map(a -> propertyAmenityRepository.findById(a.getId())
                        .orElseThrow(() -> new RuntimeException("Amenity not found: " + a.getId())))
                .collect(Collectors.toSet());
        property.setAmenities(amenities);

        List<PropertyRule> rules = dto.getRules().stream()
                .map(r -> propertyRuleRepository.findById(r.getId())
                        .orElseThrow(() -> new RuntimeException("Rule not found: " + r.getId())))
                .collect(Collectors.toList());
        property.setPropertyRules(rules);

        Set<PropertyUtility> utilities = dto.getUtilities().stream()
                .map(u -> propertyUtilityRepository.findById(u.getId())
                        .orElseThrow(() -> new RuntimeException("Utility not found: " + u.getId())))
                .collect(Collectors.toSet());
        property.setUtilities(utilities);

        property.setImages(new ArrayList<>());
        property.setVideos(new ArrayList<>());

        return property;
    }

    public List<PropertyDto> searchProperty(String location, BigDecimal price, String university) {
        return propertyRepository.findAll(
                PropertySpecification.search(location, price, university)
        ).stream().map(PropertyDto::new).toList();
    }

    public List<PropertyDto> filterProperty(String propertyType, BigDecimal distance, List<Integer> studentsPerRoom) {
        Specification<Property> spec = (root, query, cb) -> cb.conjunction();

        if (propertyType != null && !propertyType.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("propertyType")), propertyType.toLowerCase()));
        }

        if (distance != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("distanceFromCampus"), distance));
        }

        if (studentsPerRoom != null && !studentsPerRoom.isEmpty()) {
            spec = spec.and((root, query, cb) ->
                    root.get("studentsPerRoom").in(studentsPerRoom));
        }

        return propertyRepository.findAll(spec).stream()
                .map(PropertyDto::new)
                .toList();
    }



}
