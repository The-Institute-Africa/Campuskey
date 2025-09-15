package com.campuskey.backend.services;


import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyUtilityDto;
import com.campuskey.backend.entities.PropertyUtility;
import com.campuskey.backend.repositories.PropertyUtilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PropertyUtilityService {
    private final PropertyUtilityRepository propertyUtilityRepository;

    @Autowired

    public PropertyUtilityService(PropertyUtilityRepository propertyUtilityRepository){
        this.propertyUtilityRepository = propertyUtilityRepository;
    }

    public Set<PropertyUtilityDto> getAllUtilities(){
        return propertyUtilityRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toSet());

    }

    public PropertyUtilityDto convertToDto (PropertyUtility propertyUtility){
        PropertyUtilityDto dto = new PropertyUtilityDto();
        dto.setId(propertyUtility.getId());
        dto.setName(propertyUtility.getName());

        List<PropertyDto> PropertyDTOs = propertyUtility.getProperties().stream()
                .map(PropertyDto::new)
                .toList();

        dto.setProperty(PropertyDTOs);
        return dto;
    }
}
