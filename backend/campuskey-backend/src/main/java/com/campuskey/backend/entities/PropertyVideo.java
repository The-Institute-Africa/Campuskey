package com.campuskey.backend.entities;
import jakarta.persistence.*;

@Entity
@Table(name="Property_Video")
public class PropertyVideo {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String video_url;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private  Property property;

    public PropertyVideo(){}

    public PropertyVideo(String video_url , Property property){

    }
    public PropertyVideo(Long id, String video_url){
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

    public void setProperty(Property property){
        this.property = property;
    }

    public Property getProperty(){
        return property;
    }
    @Override
    public String toString(){
        return String.format(
           "PropertyVideo[id=%d, video_url='%s']", id , video_url);
    }
}
