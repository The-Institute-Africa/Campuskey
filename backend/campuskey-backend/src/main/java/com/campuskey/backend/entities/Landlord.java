package com.campuskey.backend.entities;


import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;

import com.campuskey.backend.entities.Property;

@Entity
@Table(name = "landlord")
public class Landlord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name ;

    private Integer contact;
    private String slug;

    @OneToMany(mappedBy = "landlord", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Property> properties = new HashSet<>();
    
    public Landlord(){}
    public Landlord(Long id,String name,Integer contact ,String slug ,Set<Property> properties) {

        this.id=id;
        this.name=name;
        this.contact=contact;
        this.properties = properties;
        this.slug=slug;
    }

    public void setId(Long id){
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

    public void setContact(Integer contact){
        this.contact=contact;
    }
    public Integer getContact(){
        return contact;
    }

    public void setProperty(Set<Property> properties) {
        this.properties = properties;
    }

    public Set<Property> getProperties(){
        return properties;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    @Override
    public String toString() {
        return String.format(
            "Landlord[id=%d,name='%s',contact='%d',properties.size()=%d]",
            id,name,contact,properties.size());
    }
}
