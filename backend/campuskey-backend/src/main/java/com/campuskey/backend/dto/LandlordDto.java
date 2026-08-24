package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Landlord;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class LandlordDto{
    private Long id;
   private String name ;
    private BigInteger contact;
    private String idNumber;
    private String address;
    private List<PropertyDto> properties = new ArrayList<>();
    private LocalDateTime createdAt;

    public LandlordDto(){}

    public LandlordDto(Landlord landlord) {
        this.id = landlord.getId();
        this.name= landlord.getName();
        this.contact= landlord.getContact();
        this.idNumber= landlord.getIdNumber();
        this.address=landlord.getAddress();
        if(landlord.getProperties() != null){
            this.properties = landlord.getProperties().stream()
                    .map(p -> new PropertyDto(p.getId() , p.getName() , p.getLocation()))
                    .collect(Collectors.toList());
        }
    }

    public LandlordDto(Long id, String name, BigInteger contact) {
        this.id = id;
        this.name= name;
        this.contact= contact;
    }

    public void setId(Long id){
        this.id=id;
    }
    public Long getId(){
        return id;
    }

    public void setContact(BigInteger contact) {
        this.contact = contact;
    }

    public BigInteger getContact() {
        return contact;
    }

    public void setName(String name) {
        this.name = name;
    }


    public void setIdNumber(String idNumber){
        this.idNumber=idNumber;
    }
    public String getIdNumber(){
        return idNumber;
    }

    public void setAddress(String address ){
        this.address=address;
    }
    public String getAddress(){
        return address;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
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

