package com.campuskey.backend.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "property_images")
public class PropertyImage {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String image_url;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property ;

    public PropertyImage(){}

    public PropertyImage(String image_url, Property property) {
        this.image_url = image_url;
        this.property = property;
    }


    public PropertyImage(Long id, String image_url){
        this.id=id;
        this.image_url=image_url;
    }


    public void setId(Long id) {

        this.id = id;
    }

    public Long getId(){

        return id;
    }

    public void setImageUrl(String image_url) {

        this.image_url = image_url;
    }

    public String getImageUrl() {

        return image_url;
    }
    public void setProperty(Property property){
        this.property=property;
    }
    public Property getProperty(){
        return property;
    }

    public String toString(){
        return String.format(
                "PropertyImage[id=%d, image_url='%s']", id , image_url);
    }
}
