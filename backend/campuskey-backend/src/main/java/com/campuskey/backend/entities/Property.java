package com.campuskey.backend.entities;

import com.campuskey.backend.dto.PropertyDto;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
    private String distanceFromCampus;

    @Column(nullable = false)
    private long reviewCount;

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

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyAmenity> amenities = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyUtility> utilities = new ArrayList<>();

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyRule> propertyRules = new ArrayList<>();

    private String description;
    private String location;
    private BigDecimal price;
    private String propertyType;
    private Double review ;



    private LocalDateTime createdAt = LocalDateTime.now();

    private Long views = 0L;

    @OneToOne(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private PropertyVerification verification;

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
                    List<PropertyAmenity> amenities, List<PropertyUtility> utilities,
                    String description,Double review, String location, BigDecimal price,
                    String propertyType,BigDecimal propertyDeposit,
   String distanceFromCampus,LocalDateTime createdAt , Long views ,
                    PropertyVerification verification ,long reviewCount
                    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.university = university;
        this.landlord = landlord;
        this.studentsPerRoom = studentsPerRoom != null ? studentsPerRoom : new ArrayList<>();
        this.propertyRules = propertyRules != null ? propertyRules : new ArrayList<>();
        this.images = images != null ? images : new ArrayList<>();
        this.propertyVideos = propertyVideos != null ? propertyVideos : new ArrayList<>();
        this.amenities = amenities != null ? amenities : new ArrayList<>();
        this.utilities = utilities != null ? utilities : new ArrayList<>();
        this.description = description;
        this.location = location;
        this.price = price;
        this.slug=slug;
        this.propertyType = propertyType;
        this.distanceFromCampus=distanceFromCampus;
        this.propertyDeposit=propertyDeposit;
        this.review=review;
        this.createdAt = createdAt;
        this.views=views;
        this.verification=verification;
        this.reviewCount=reviewCount;
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

    public List<PropertyAmenity> getAmenities() {
        return amenities;
    }
    public void setAmenities(List<PropertyAmenity> amenities) {
        this.amenities = amenities;
    }

    public List<PropertyUtility> getUtilities() {
        return utilities;
    }
    public void setUtilities(List<PropertyUtility> utilities) {
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

    public String getDistanceFromCampus(){
        return  distanceFromCampus;
    }

    public void setDistanceFromCampus(String distanceFromCampus) {
        this.distanceFromCampus = distanceFromCampus;
    }

    public Double  getRating() {
        return review;
    }

    public void setRating(Double review) {
        this.review = review;
    }

    public List<PropertyVideo> getPropertyVideos() {
        return propertyVideos;
    }

    public void setPropertyVideos(List<PropertyVideo> propertyVideos) {
        this.propertyVideos = propertyVideos;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt){
        this.createdAt=createdAt;
    }

    public Long getViews(){
        return views;
    }

    public void setViews(Long views){
        this.views=views;
    }

    public long getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public PropertyVerification getVerification() {
        return verification;
    }

    public void setVerification(PropertyVerification verification) {
        this.verification = verification;
        if (verification != null) {
            verification.setProperty(this);
        }
    }

    @Override
    public String toString() {
        return String.format(
                "Property[id=%d, name='%s', address='%s',university='%s',ratings='%d',distanceFromCampus='%s',propertyDeposit='%s', slug='%s',studentsPerRoom=%s, images=%d, videos=%d, amenities=%d, utilities=%d, rules=%d, description='%s', location='%s', price='%.2f', propertyType='%s', landlord='%s' , createdAt='%s',views='%s' , verification='%s' , review='%s']",
                id, name, address,university,review,distanceFromCampus,propertyDeposit,slug, studentsPerRoom, images.size(), propertyVideos.size(),
                amenities.size(), utilities.size(), propertyRules.size(),
                description, location, price, propertyType,
                landlord != null ? landlord.getName() : "N/A" ,
                createdAt,views , verification , reviewCount
        );
    }
}
