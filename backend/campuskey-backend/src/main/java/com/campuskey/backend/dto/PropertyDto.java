package com.campuskey.backend.dto;

import com.campuskey.backend.entities.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
    private List<PropertyVideoDto> videos = new ArrayList<>();
    private Set<PropertyAmenityDto> amenities = new HashSet<>();
    private Set<PropertyUtilityDto> utilities = new HashSet<>();
    private List<PropertyRuleDto> rules = new ArrayList<>();
    private BigDecimal propertyDeposit;
    private BigDecimal distanceFromCampus;
    // Constructors
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
        if (property.getStudentsPerRoom() != null) {
            this.studentsPerRoom = new ArrayList<>(property.getStudentsPerRoom());
        }

        if (property.getLandlord() != null) {
            this.landlord = new LandlordDto(
                    property.getLandlord().getId(),
                    property.getLandlord().getName(),
                    property.getLandlord().getContact()
            );
        }

        if (property.getPropertyRules() != null) {
            this.rules = property.getPropertyRules().stream()
                    .map(r -> new PropertyRuleDto(r.getId(), r.getDescription()))
                    .collect(Collectors.toList());
        }

        if (property.getImages() != null) {
            this.images = property.getImages().stream()
                    .map(i -> new PropertyImageDto(i.getId(), i.getImageUrl()))
                    .collect(Collectors.toList());
        }

        if (property.getVideos() != null) {
            this.videos = property.getVideos().stream()
                    .map(v -> new PropertyVideoDto(v.getId(), v.getVideoUrl()))
                    .collect(Collectors.toList());
        }

        if (property.getUtilities() != null) {
            this.utilities = property.getUtilities().stream()
                    .map(u -> new PropertyUtilityDto(u.getId(), u.getName()))
                    .collect(Collectors.toSet());
        }

        if (property.getAmenities() != null) {
            this.amenities = property.getAmenities().stream()
                    .map(a -> new PropertyAmenityDto(a.getId(), a.getName()))
                    .collect(Collectors.toSet());
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

    public Set<PropertyAmenityDto> getAmenities() {
        return amenities;
    }
    public void setAmenities(Set<PropertyAmenityDto> amenities) {
        this.amenities = amenities;
    }

    public Set<PropertyUtilityDto> getUtilities() {
        return utilities;
    }
    public void setUtilities(Set<PropertyUtilityDto> utilities) {
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

    public BigDecimal getDistanceFromCampus(){
        return  distanceFromCampus;
    }

    public void setDistanceFromCampus(BigDecimal distanceFromCampus) {
        this.distanceFromCampus = distanceFromCampus;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }
}
