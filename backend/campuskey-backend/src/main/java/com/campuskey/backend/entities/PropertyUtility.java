package com.campuskey.backend.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;



import jakarta.persistence.ManyToMany;

@Entity
@Table(name="utility")
public class PropertyUtility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToMany(mappedBy = "utilities" , cascade = CascadeType.ALL)
    private  List<Property> properties = new ArrayList<>();

    public PropertyUtility() {}

    public PropertyUtility(Long id, String name){
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

    public void setProperty(List<Property> properties){
        this.properties = properties;
    }

    public List<Property> getProperties(){
        return properties;
    }
    public String toString(){
        return "PropertyUtility[id=%id,name='%s']";
    }

}
