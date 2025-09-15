package com.campuskey.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class PropertyUtilityDto {
    private Long id;
    private String name;
    private List<PropertyDto> properties = new ArrayList<>();

    public PropertyUtilityDto() {}
    public PropertyUtilityDto(Long id, String name){
        this.id=id;
        this.name=name;
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

    public void setProperty(List<PropertyDto> properties){
        this.properties = properties;
    }

    public List<PropertyDto> getProperties(){
        return properties;
    }

}
