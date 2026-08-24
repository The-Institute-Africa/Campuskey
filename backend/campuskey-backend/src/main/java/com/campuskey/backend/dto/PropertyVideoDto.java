package com.campuskey.backend.dto;

public class PropertyVideoDto {
    private Long id;
    private String video_url;

    private PropertyDto propertyDto;

    public PropertyVideoDto(){}

    public PropertyVideoDto(Long id, String video_url){
        this.id=id;
        this.video_url=video_url;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId(){

        return id;
    }
    public void setVideoUrl(String video_url) {

        this.video_url = video_url;
    }

    public String getVideoUrl() {

        return video_url;
    }

    public void setProperty(PropertyDto propertyDto){
        this.propertyDto = propertyDto;
    }

    public PropertyDto getProperty(){
        return propertyDto;
    }
}
