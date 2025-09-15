package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyAmenityDto;
import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.entities.PropertyAmenity;
import com.campuskey.backend.repositories.PropertyAmenityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyAmenityService {
    private final PropertyAmenityRepository propertyAmenityRepository;
    @Autowired
    public PropertyAmenityService(PropertyAmenityRepository propertyAmenityRepository){
        this.propertyAmenityRepository = propertyAmenityRepository;
    }

    public Set<PropertyAmenityDto> getAllAmenities(){
        return propertyAmenityRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toSet());
    }

    public PropertyAmenityDto convertToDto(PropertyAmenity propertyAmenity){
        PropertyAmenityDto dto = new PropertyAmenityDto();
        dto.setId(propertyAmenity.getId());
        dto.setName(propertyAmenity.getName());

        List<PropertyDto> PropertyDTOs = propertyAmenity.getProperties().stream()
                .map(PropertyDto::new)
                .toList();

        dto.setProperty(PropertyDTOs);
        return dto;

    }
}
