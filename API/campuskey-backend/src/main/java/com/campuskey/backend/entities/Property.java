package com.campuskey.backend.entities;

import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.campuskey.backend.entities.Amenity;
import com.campuskey.backend.entities.Image;
import com.campuskey.backend.entities.Landlord;

@Entity
@Table(name = "property")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id") 
    private Landlord landlord;

    private String name;
    private String address;
    
    private List<Integer> numberPerRoom;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Video> videos = new ArrayList<>();


    @ManyToMany
    @JoinTable(name="Amenity",
            joinColumns = @JoinColumn(name="propertyId"),
            inverseJoinColumns = @JoinColumn(name="id")
            )
    private Set<Amenity> amenities = new HashSet<>();

    private String description;
    private String Location;
    private Double Price;
    private String PropertyType;

    public Property() {}

    public Property(Long id, String name, String address, Landlord landlord, List<Integer> numberPerRoom, List<Image> images, List<Video> videos, Set<Amenity> amenities, String description, String location, Double price, String propertyType) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.landlord = landlord;
        this.numberPerRoom = numberPerRoom;
        this.images = images;
        this.videos = videos;
        this.amenities = amenities;
        this.description = description;
        this.Location = location;
        this.Price = price;
        this.PropertyType = propertyType;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getAddress() {
        return address;
    }

    public void setLandlord(Landlord landlord) {
        this.landlord = landlord;
    }

    public Landlord getLandlordId() {
        return landlord;
    }

    public void setNumberPerRoom(List<Integer> numberPerRoom) {
        this.numberPerRoom = numberPerRoom;
    }

    public List<Integer> getNumberPerRoom() {
        return numberPerRoom;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

    public List<Video> getVideos() {
        return videos;
    }

    public void setAmenities(Set<Amenity> amenities) {
        this.amenities = amenities;
    }

    public Set<Amenity> getAmenities() {
        return amenities;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setLocation(String location) {
        this.Location = location;
    }

    public String getLocation() {
        return Location;
    }

    public void setPrice(Double price) {
        this.Price = price;
    }

    public Double getPrice() {
        return Price;
    }
    public void setPropertyType(String propertyType) {
        this.PropertyType = propertyType;
    }

    public String getPropertyType() {
        return PropertyType;
    }

    @Override
    public String toString (){
        return String.format(
            "Property[id=%d, name='%s' ,address='%s', numberPerRoom='%s', images='%s', videos='%s', amenities='%s', description='%s', Location='%s', Price=%.2f, PropertyType='%s', landlord='%s']",
            id, name, address, numberPerRoom, images, videos, amenities, description, Location, Price, PropertyType , landlord.getId()
        );
    }
}
