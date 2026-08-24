package com.campuskey.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "property_rules")
public class PropertyRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id=id;
    }

    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description=description;
    }

    public void setProperty(Property property){
        this.property = property;
    }
    public Property getProperty(){
        return property;
    }

    @Override
    public String toString(){
        return "PropertyRule[id=%d,description='%s']";
    }
}
