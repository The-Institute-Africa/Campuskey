package com.campuskey.backend.dto;



public class PropertyImageDto {

    private Long id;
    private String image_url;
    private PropertyDto propertyDto ;

    public PropertyImageDto(){}

    public PropertyImageDto(Long id , String image_url){
        this.id=id;
        this.image_url=image_url;
    }

    public void setId(Long id){

        this.id=id;
    }
    public Long getId(){
        return id;
    }

    public void setImageUrl(String image_url){
        this.image_url=image_url;
    }
    public String getImageUrl(){
        return image_url;
    }

    public void setProperty(PropertyDto propertyDto){
        this.propertyDto=propertyDto;
    }
    public PropertyDto  getProperty(){
        return propertyDto;
    }
}
