package com.campuskey.backend.entities;

import com.campuskey.backend.dto.PropertyDto;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.*;

@Entity
@Table(name = "property")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id", nullable = false)
    private Landlord landlord;

    private String name;
    private String address;
    private String  university;
    private BigDecimal propertyDeposit;
    private BigDecimal distanceFromCampus;

    @Column(unique = true, nullable = false)
    private String slug;

    @ElementCollection
    @CollectionTable(name = "property_students_per_room", joinColumns = @JoinColumn(name = "property_id"))
    @Column(name = "students_per_room")
    private List<Integer> studentsPerRoom = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyVideo> propertyVideos = new ArrayList<>();

    @ManyToMany
    private Set<PropertyAmenity> amenities = new HashSet<>();

    @ManyToMany
    private Set<PropertyUtility> utilities = new HashSet<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyRule> propertyRules = new ArrayList<>();

    private String description;
    private String location;
    private BigDecimal price;
    private String propertyType;
    private String rating;

    // Constructors
    public Property() {}
    public Property(PropertyDto propertyDto){}
    public Property(Long id , String name , String location){
        this.id=id;
        this.name=name;
        this.location = location;
    }
    public Property(Long id, String name,String university ,String address, String slug, Landlord landlord,
                    List<Integer> studentsPerRoom, List<PropertyRule> propertyRules,
                    List<PropertyImage> images, List<PropertyVideo> propertyVideos,
                    Set<PropertyAmenity> amenities, Set<PropertyUtility> utilities,
                    String description,String rating, String location, BigDecimal price, String propertyType,BigDecimal propertyDeposit,
   BigDecimal distanceFromCampus) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.university = university;
        this.landlord = landlord;
        this.studentsPerRoom = studentsPerRoom != null ? studentsPerRoom : new ArrayList<>();
        this.propertyRules = propertyRules != null ? propertyRules : new ArrayList<>();
        this.images = images != null ? images : new ArrayList<>();
        this.propertyVideos = propertyVideos != null ? propertyVideos : new ArrayList<>();
        this.amenities = amenities != null ? amenities : new HashSet<>();
        this.utilities = utilities != null ? utilities : new HashSet<>();
        this.description = description;
        this.location = location;
        this.price = price;
        this.slug=slug;
        this.propertyType = propertyType;
        this.distanceFromCampus=distanceFromCampus;
        this.propertyDeposit=propertyDeposit;
        this.rating=rating;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    public Landlord getLandlord() {
        return landlord;
    }
    public void setLandlord(Landlord landlord) {
        this.landlord = landlord;
    }

    public List<Integer> getStudentsPerRoom() {
        return studentsPerRoom;
    }
    public void setStudentsPerRoom(List<Integer> studentsPerRoom) {
        this.studentsPerRoom = studentsPerRoom;
    }

    public List<PropertyImage> getImages() {
        return images;
    }
    public void setImages(List<PropertyImage> images) {
        this.images = images;
    }

    public List<PropertyVideo> getVideos() {
        return propertyVideos;
    }
    public void setVideos(List<PropertyVideo> propertyVideos) {
        this.propertyVideos = propertyVideos;
    }

    public Set<PropertyAmenity> getAmenities() {
        return amenities;
    }
    public void setAmenities(Set<PropertyAmenity> amenities) {
        this.amenities = amenities;
    }

    public Set<PropertyUtility> getUtilities() {
        return utilities;
    }
    public void setUtilities(Set<PropertyUtility> utilities) {
        this.utilities = utilities;
    }

    public List<PropertyRule> getPropertyRules() {
        return propertyRules;
    }
    public void setPropertyRules(List<PropertyRule> propertyRules) {
        this.propertyRules = propertyRules;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getPropertyType() {
        return propertyType;
    }
    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getSlug(){
        return slug;
    }

    public void setSlug(String slug){
        this.slug=slug;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public BigDecimal getPropertyDeposit() {
        return propertyDeposit;
    }

    public void setPropertyDeposit(BigDecimal propertyDeposit) {
        this.propertyDeposit = propertyDeposit;
    }

    public BigDecimal getDistanceFromCampus(){
        return  distanceFromCampus;
    }

    public void setDistanceFromCampus(BigDecimal distanceFromCampus) {
        this.distanceFromCampus = distanceFromCampus;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public List<PropertyVideo> getPropertyVideos() {
        return propertyVideos;
    }

    public void setPropertyVideos(List<PropertyVideo> propertyVideos) {
        this.propertyVideos = propertyVideos;
    }

    @Override
    public String toString() {
        return String.format(
                "Property[id=%d, name='%s', address='%s',university='%s',rating='%s',distanceFromCampus='%s',propertyDeposit='%s', slug='%s',studentsPerRoom=%s, images=%d, videos=%d, amenities=%d, utilities=%d, rules=%d, description='%s', location='%s', price='%.2f', propertyType='%s', landlord='%s']",
                id, name, address,university,rating,distanceFromCampus,propertyDeposit,slug, studentsPerRoom, images.size(), propertyVideos.size(),
                amenities.size(), utilities.size(), propertyRules.size(),
                description, location, price, propertyType,
                landlord != null ? landlord.getName() : "N/A"
        );
    }
}
