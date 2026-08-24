package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Property;

public class RatingDto {
    private PropertyDto propertyDto;
    private Long id;
    private double score;

    public Long getId(){
        return id;
    }

    public void setId(Long id ){
        this.id=id;
    }

    public double score(){
        return score;
    }

    public void setScore(double score ){
        this.score=score;
    }

    public void setProperty(PropertyDto propertyDto){
        this.propertyDto = propertyDto;
    }
    public PropertyDto getProperty(){
        return propertyDto;
    }
}
