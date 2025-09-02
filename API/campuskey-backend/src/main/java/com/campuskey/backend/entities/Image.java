package com.campuskey.backend.entities;
import jakarta.persistence.*;

@Entity
@Table(name= "Images")
public class Image {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String image_url;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    public Image(){}
    public Image(Long id,String image_url){
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


    public String toString(){
        return String.format(
           "Image[id=%d, image_url='%s']", id , image_url);
    }
}
