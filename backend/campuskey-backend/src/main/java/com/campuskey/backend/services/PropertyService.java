package com.campuskey.backend.services;

import com.campuskey.backend.dto.*;
import com.campuskey.backend.entities.*;
import com.campuskey.backend.repositories.*;
import com.campuskey.backend.specification.PropertySpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class
PropertyService {

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
                           PropertyUtilityRepository propertyUtilityRepository
                          ) {
        this.propertyRepository = propertyRepository;
        this.propertyImageService = propertyImageService;
        this.propertyVideoService = propertyVideoService;
        this.landlordRepository = landlordRepository;
        this.propertyAmenityRepository = propertyAmenityRepository;
        this.propertyRuleRepository = propertyRuleRepository;
        this.propertyUtilityRepository = propertyUtilityRepository;
    }

    private String generateSlug(String name) {
        return name.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("-$", "")
                .replaceAll("^-", "")
                + "-" + UUID.randomUUID().toString().substring(0, 8);
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

    public List<PropertyDto> getPropertiesByUsername(String username) {
        // 1. Find the landlord by their account username
        Landlord landlord = landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Landlord not found"));

        // 2. Use the landlord object to find all properties linked to them
        return propertyRepository.findByLandlord(landlord);
    }

    // ✅ Create new property
    public PropertyDto createProperty(String username, PropertyDto dto,
                                      List<MultipartFile> pictures,
                                      List<MultipartFile> videos
                                      ) throws IOException  {

        Landlord landlord = landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Landlord not found"));

        Property property = buildPropertyFromDto(dto);
        property.setLandlord(landlord);

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
    public PropertyDto updateProperty(String username , String slug,
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
        property.setPrice(dto.getPrice());
        property.setStudentsPerRoom(dto.getStudentsPerRoom());

        // Update landlord
        Landlord landlord = landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Landlord not found"));

        if (dto.getSlug() != null && !dto.getSlug().isBlank()) {
            property.setSlug(dto.getSlug());
        } else if (property.getSlug() == null) {
            property.setSlug(generateSlug(property.getName()));
        }

        // ONLY update amenities if they were explicitly provided
        if (dto.getAmenities() != null) {
            property.getAmenities().clear();
            for (PropertyAmenityDto amenityDto : dto.getAmenities()) {
                PropertyAmenity amenity = new PropertyAmenity();
                // map scalar fields only
                amenity.setName(amenityDto.getName());
                // owning side
                amenity.setProperty(property);
                property.getAmenities().add(amenity);
            }
        }


        // ONLY update amenities if they were explicitly provided
        if (dto.getRules() != null) {
            property.getPropertyRules().clear();

            for (PropertyRuleDto ruleDto : dto.getRules()) {
                PropertyRule propertyRule = new PropertyRule();

                // map scalar fields
                propertyRule.setDescription(ruleDto.getDescription());

                // owning side
                propertyRule.setProperty(property);

                property.getPropertyRules().add(propertyRule);
            }
        }



        // ONLY update amenities if they were explicitly provided
        if (dto.getUtilities() != null) {
            property.getUtilities().clear();
            for (PropertyUtilityDto utilityDto : dto.getUtilities()) {
                PropertyUtility utility = new PropertyUtility();
                // map scalar fields only
                utility.setName(utilityDto.getName());
                // owning side
                utility.setProperty(property);
                property.getUtilities().add(utility);
            }
        }

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
    public void deleteProperty(String slug , String username) {

        Landlord landlord = landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Landlord not found"));

        Property property = propertyRepository.findBySlug(slug)
                .orElseThrow(() -> new NoSuchElementException("Property not found with slug: " + slug));

        if (!property.getLandlord().getId().equals(landlord.getId())) {
            throw new RuntimeException("You are not authorized to delete this property");
        }
        propertyRepository.delete(property);
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


    private PropertyDto convertToDto(Property property) {
        PropertyDto dto = new PropertyDto();
        dto.setId(property.getId());
        dto.setName(property.getName());
        dto.setAddress(property.getAddress());
        dto.setPrice(property.getPrice());

        if (property.getImages() != null && !property.getImages().isEmpty()) {
            List<PropertyImageDto> imageDtos = property.getImages()
                    .stream()
                    .map(img -> new PropertyImageDto(img.getId(), img.getImageUrl()))
                    .collect(Collectors.toList());
            dto.setImages(imageDtos);
        }


        return dto;
    }


/*
    public PropertyVerificationDto toVerificationDto(PropertyVerification pv) {
        if (pv == null) return null;

        PropertyVerificationDto dto = new PropertyVerificationDto();
        dto.setId(pv.getId());
        dto.setStatus(pv.getStatus().name());
        dto.setInspector(pv.getInspector());
        dto.setSubmittedAt(pv.getSubmittedAt());
        dto.setVerifiedAt(pv.getVerifiedAt());
        dto.setNotes(pv.getNotes());
        dto.setDocumentPath(pv.getDocumentPath());
        dto.setPropertyId(pv.getProperty().getId());

        return dto;
    }
*/
private Property buildPropertyFromDto(PropertyDto dto) {
    Property property = new Property();
    property.setName(dto.getName());
    property.setAddress(dto.getAddress());
    property.setDescription(dto.getDescription());
    property.setLocation(dto.getLocation());
    property.setPrice(dto.getPrice());
    property.setPropertyType(dto.getPropertyType());
    property.setUniversity(dto.getUniversity());
    property.setDistanceFromCampus(dto.getDistanceFromCampus());
    property.setPropertyDeposit(dto.getPropertyDeposit());
    property.setStudentsPerRoom(dto.getStudentsPerRoom());

    String slug = dto.getSlug();
    if (slug == null || slug.isBlank()) {
        slug = generateSlug(dto.getName()); // e.g., "my-property-name-123"
    }
    property.setSlug(slug);


    // ✅ Null-safe amenities
    List<PropertyAmenity> amenities = Optional.ofNullable(dto.getAmenities())
            .orElse(Collections.emptyList())
            .stream()
            .map(a -> {
                if (a.getId() != null) {
                    return propertyAmenityRepository.findById(a.getId())
                            .orElseThrow(() -> new RuntimeException("Amenity not found: " + a.getId()));
                } else {
                    PropertyAmenity amenity = new PropertyAmenity();
                    amenity.setName(a.getName());
                    amenity.setProperty(property);
                    return amenity;
                }
            })
            .collect(Collectors.toList());
    property.setAmenities(amenities);

    // ✅ Null-safe utilities
    List<PropertyUtility> utilities = Optional.ofNullable(dto.getUtilities())
            .orElse(Collections.emptyList())
            .stream()
            .map(u -> {
                if (u.getId() != null) {
                    return propertyUtilityRepository.findById(u.getId())
                            .orElseThrow(() -> new RuntimeException("Utility not found: " + u.getId()));
                } else {
                    PropertyUtility utility = new PropertyUtility();
                    utility.setName(u.getName());
                    utility.setProperty(property);
                    return utility;
                }
            })
            .collect(Collectors.toList());
    property.setUtilities(utilities);

    // ✅ Null-safe rules
    List<PropertyRule> rules = Optional.ofNullable(dto.getRules())
            .orElse(Collections.emptyList())
            .stream()
            .map(r -> {
                if (r.getId() != null) {
                    return propertyRuleRepository.findById(r.getId())
                            .orElseThrow(() -> new RuntimeException("Rule not found: " + r.getId()));
                } else {
                    PropertyRule rule = new PropertyRule();
                    rule.setDescription(r.getDescription());
                    rule.setProperty(property);
                    return rule;
                }
            })
            .collect(Collectors.toList());
    property.setPropertyRules(rules);

    property.setImages(new ArrayList<>());
    property.setVideos(new ArrayList<>());

    return property;
}
}
