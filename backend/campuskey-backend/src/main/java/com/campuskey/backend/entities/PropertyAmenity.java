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

    @ManyToOne
    @JoinColumn(name = "property_id")
    private  Property property ;

    public PropertyAmenity() {}

    public PropertyAmenity(Long id, String name, Property property){
        this.id=id;
        this.name=name;
        this.property = property;
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

    public void setProperty(Property property){
        this.property = property;
    }
    public Property getProperty(){
        return property;
    }
    @Override
    public String toString(){
        return "PropertyAmenity[id=%d,name='%s']";
    }

}
