package com.campuskey.backend.dto;

import java.util.ArrayList;
import java.util.List;

public class PropertyAmenityDto {

    private Long id;
    private String name;
    private List<PropertyDto> properties = new ArrayList<>();

    public PropertyAmenityDto(){}

    public PropertyAmenityDto(Long id , String name){
        this.id=id;
        this.name=name;
    }

    public void setId(Long id)
    {
        this.id = id;
    }
    public Long getId(){

        return id;
    }

    public void setName(String name){

        this.name=name;
    }
    public String getName(){

        return name;
    }

    public void setProperty(List<PropertyDto> properties){
        this.properties = properties;
    }

    public List<PropertyDto> getProperties(){
        return properties;
    }
}
