package com.campuskey.backend.entities;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;



import jakarta.persistence.ManyToMany;

@Entity
@Table(name="amenity")
public class PropertyAmenity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "amenities")
    private  List<Property> properties = new ArrayList<>();

    public PropertyAmenity() {}

    public PropertyAmenity(Long id, String name, List<Property> properties){
        this.id=id;
        this.name=name;
        this.properties = properties;
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

    public void setProperty(List<Property> properties){
        this.properties = properties;
    }
    public List<Property> getProperties(){
        return properties;
    }
    @Override
    public String toString(){
        return "PropertyAmenity[id=%d,name='%s']";
    }

}
