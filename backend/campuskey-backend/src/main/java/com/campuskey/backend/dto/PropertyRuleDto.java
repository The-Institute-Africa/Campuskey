package com.campuskey.backend.dto;

public class PropertyRuleDto {
    private Long id;
    private String description;
    private PropertyDto propertyDto;

    public PropertyRuleDto(){}
    public PropertyRuleDto(Long id , String description){
        this.id=id;
        this.description=description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setProperty(PropertyDto propertyDto){
        this.propertyDto = propertyDto;
    }
    public PropertyDto getProperties(){
        return propertyDto;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
