package com.campuskey.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class PropertyUtilityDto {
    private Long id;
    private String name;
    private PropertyDto propertyDto;

    public PropertyUtilityDto() {}
    public PropertyUtilityDto(Long id, String name){
        this.id=id;
        this.name=name;
    }
    public PropertyUtilityDto(Long id, String name,PropertyDto propertyDto){
        this.id=id;
        this.name=name;
        this.propertyDto=propertyDto;
    }
    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }
    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name=name;
    }

    public void setProperty(PropertyDto propertyDto){
        this.propertyDto = propertyDto;
    }

    public PropertyDto  getProperties(){
        return propertyDto;
    }

}
