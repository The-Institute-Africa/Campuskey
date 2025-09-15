package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Landlord;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class LandlordDto {
    private Long id;
    private String name ;
    private Integer contact;
    private List<PropertyDto> properties = new ArrayList<>();

    public LandlordDto(){}

    public LandlordDto(Long id, String name, Integer contact){
        this.id=id;
        this.name=name;
        this.contact=contact;
    }

    public LandlordDto(Landlord landlord) {
        this.id= landlord.getId();
        this.name= landlord.getName();
        this.contact= landlord.getContact();
        if(landlord.getProperties() != null){
            this.properties = landlord.getProperties().stream()
                    .map(p -> new PropertyDto(p.getId() , p.getName() , p.getLocation()))
                    .collect(Collectors.toList());
        }
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setContact(Integer contact) {
        this.contact = contact;
    }

    public Integer getContact() {
        return contact;
    }

    public void setName(String name) {
        this.name = name;
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

