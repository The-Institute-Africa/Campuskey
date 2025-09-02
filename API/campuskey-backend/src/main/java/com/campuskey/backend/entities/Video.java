package com.campuskey.backend.entities;

import com.campuskey.backend.entities.Property;
import jakarta.persistence.*;

@Entity
@Table(name="Videos")
public class Video {

    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String video_url;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
    
    public Video(){}
    public  Video (Long id,String video_url){
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


    public String toString(){
        return String.format(
           "Images[id=%d, video_url='%s']", id , video_url);
    }
}
