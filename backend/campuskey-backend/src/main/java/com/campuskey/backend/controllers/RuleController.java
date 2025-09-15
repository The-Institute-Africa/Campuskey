package com.campuskey.backend.controllers;


import com.campuskey.backend.dto.PropertyRuleDto;
import com.campuskey.backend.services.PropertyRuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class RuleController {
    private final PropertyRuleService propertyRuleService;

    @Autowired
    public RuleController(PropertyRuleService propertyRuleService){
        this.propertyRuleService = propertyRuleService;
    }

    @GetMapping("rules")
    public List<PropertyRuleDto> getAllRules(){
        return propertyRuleService.getAllRules();
    }
}
