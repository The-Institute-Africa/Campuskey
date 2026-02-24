package com.campuskey.backend.dto;

import com.campuskey.backend.entities.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PropertyDto {
    private Long id;
    private String name;
    private String address;
    private String description;
    private String location;
    private BigDecimal price;
    private String propertyType;
    private String slug;
    private String university ;


    private LandlordDto landlord;

    private List<Integer> studentsPerRoom = new ArrayList<>();

    private List<PropertyImageDto> images = new ArrayList<>();

    @JsonIgnore
    private List<PropertyVideoDto> videos = new ArrayList<>();

    private List<PropertyAmenityDto> amenities = new ArrayList<>();
    private List<PropertyUtilityDto> utilities = new ArrayList<>();
    private List<PropertyRuleDto> rules = new ArrayList<>();
    private BigDecimal propertyDeposit;
    private String distanceFromCampus;
    private LocalDateTime createdAt = LocalDateTime.now();
    private PropertyVerificationDto verification;

    public PropertyDto() {}

    public PropertyDto(Long id , String name , String location){
        this.id=id;
        this.name=name;
        this.location = location;
    }
    public PropertyDto(Property property) {
        this.id = property.getId();
        this.name = property.getName();
        this.address = property.getAddress();
        this.description = property.getDescription();
        this.location = property.getLocation();
        this.price = property.getPrice();
        this.propertyType = property.getPropertyType();
        this.slug = property.getSlug();
        this.university = property.getUniversity();
        this.distanceFromCampus = property.getDistanceFromCampus();
        this.propertyDeposit = property.getPropertyDeposit();
        this.createdAt = property.getCreatedAt();


        if (property.getStudentsPerRoom() != null) {
            this.studentsPerRoom = new ArrayList<>(property.getStudentsPerRoom());
        }
        PropertyVerification verificationEntity = property.getVerification();
        if (verificationEntity != null) {
            this.verification = new PropertyVerificationDto(
                    verificationEntity.getId(),
                    property.getId(),
                    verificationEntity.getStatus().name(),
                    verificationEntity.getInspector(),
                    verificationEntity.getSubmittedAt(),
                    verificationEntity.getVerifiedAt(),
                    verificationEntity.getNotes(),
                    verificationEntity.getDocumentPath()
            );
        }



        Landlord landlord = property.getLandlord();
        if (landlord == null) {
            throw new IllegalStateException("Property " + property.getId() + " has no landlord!");
        }
        this.landlord = new LandlordDto(
                landlord.getId(),
                landlord.getName(),
                landlord.getContact()
        );


        if (property.getPropertyRules() != null) {
            this.rules = property.getPropertyRules().stream()
                    .map(r -> new PropertyRuleDto(r.getId(), r.getDescription()))
                    .collect(Collectors.toList());
        }
        if (property.getImages() != null) {
            property.getImages().forEach(img -> this.images.add(new PropertyImageDto(img.getId(), img.getImageUrl())));
        }

        if (property.getVideos() != null) {
            property.getVideos().forEach(video -> this.videos.add(new PropertyVideoDto(video.getId(), video.getVideoUrl())));
        }

        if (property.getUtilities() != null) {
            this.utilities = property.getUtilities().stream()
                    .map(u -> new PropertyUtilityDto(u.getId(), u.getName()))
                    .collect(Collectors.toList());
        }

        if (property.getAmenities() != null) {
            this.amenities = property.getAmenities().stream()
                    .map(a -> new PropertyAmenityDto(a.getId(), a.getName()))
                    .collect(Collectors.toList());
        }
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public LandlordDto getLandlord() {
        return landlord;
    }
    public void setLandlord(LandlordDto landlord) {
        this.landlord = landlord;
    }

    public List<Integer> getStudentsPerRoom() {
        return studentsPerRoom;
    }
    public void setStudentsPerRoom(List<Integer> studentsPerRoom) {
        this.studentsPerRoom = studentsPerRoom;
    }

    public List<PropertyImageDto> getImages() {
        return images;
    }
    public void setImages(List<PropertyImageDto> images) {
        this.images = images;
    }

    public List<PropertyVideoDto> getVideos() {
        return videos;
    }
    public void setVideos(List<PropertyVideoDto> videos) {
        this.videos = videos;
    }

    public List<PropertyAmenityDto> getAmenities() {
        return amenities;
    }
    public void setAmenities(List<PropertyAmenityDto> amenities) {
        this.amenities = amenities;
    }

    public List<PropertyUtilityDto> getUtilities() {
        return utilities;
    }
    public void setUtilities(List<PropertyUtilityDto> utilities) {
        this.utilities = utilities;
    }

    public List<PropertyRuleDto> getRules() {
        return rules;
    }
    public void setRules(List<PropertyRuleDto> rules) {
        this.rules = rules;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }


    public String getSlug() {
        return slug;
    }

    public String getPropertyType() {
        return propertyType;
    }
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public BigDecimal getPropertyDeposit() {
        return propertyDeposit;
    }

    public void setPropertyDeposit(BigDecimal propertyDeposit) {
        this.propertyDeposit = propertyDeposit;
    }

    public String getDistanceFromCampus(){
        return  distanceFromCampus;
    }

    public void setDistanceFromCampus(String distanceFromCampus) {
        this.distanceFromCampus = distanceFromCampus;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public LocalDateTime getCreatedAt(){return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt ){this.createdAt=createdAt;}

    public PropertyVerificationDto getVerification() {
        return verification;
    }

    public void setVerification(PropertyVerificationDto verification) {
        this.verification = verification;
    }

}
