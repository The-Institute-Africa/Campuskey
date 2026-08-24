package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyRuleDto;
import com.campuskey.backend.entities.PropertyRule;
import com.campuskey.backend.repositories.PropertyRuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PropertyRuleService {

    private final PropertyRuleRepository propertyRuleRepository;
    @Autowired
    public PropertyRuleService(PropertyRuleRepository propertyRuleRepository){
        this.propertyRuleRepository = propertyRuleRepository;
    }

    public List<PropertyRuleDto> getAllRules(){
        return propertyRuleRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PropertyRuleDto convertToDto (PropertyRule propertyRule){
        PropertyRuleDto dto = new PropertyRuleDto();
        dto.setId(propertyRule.getId());
        dto.setDescription(propertyRule.getDescription());

        PropertyDto propertyDTO = new PropertyDto(propertyRule.getProperty());
        dto.setProperty(propertyDTO);

        return dto;
    }
}
