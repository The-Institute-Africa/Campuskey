package com.campuskey.backend.entities;


import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "landlord")
public class Landlord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name ;

    private BigInteger contact;

    private String ownerUsername;

    private String idNumber;
    private String address;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "landlord", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Property> properties = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Landlord(){}

    public Landlord(String ownerUsername, LocalDateTime createdAt,String name,BigInteger contact,String idNumber,String address ,Set<Property> properties) {

        this.ownerUsername=ownerUsername;
        this.name=name;
        this.contact=contact;
        this.idNumber=idNumber;
        this.address=address;
        this.properties = properties;
        this.createdAt=createdAt;
    }

    public void setName(String name){
        this.name=name;
    }
    public String getName(){
        return name;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }
    public void setId(Long id){
        this.id=id;
    }
    public Long getId(){
        return id;
    }

    public void setContact(BigInteger contact){
        this.contact=contact;
    }
    public BigInteger getContact(){
        return contact;
    }

    public void setIdNumber(String idNumber){
        this.idNumber=idNumber;
    }
    public String getIdNumber(){
        return idNumber;
    }

    public void setAddress(String address ){
        this.address=address;
    }
    public String getAddress(){
        return address;
    }

    public void setProperty(Set<Property> properties) {
        this.properties = properties;
    }

    public Set<Property> getProperties(){
        return properties;
    }

    public void setOwnerUsername(String username) {
        this.ownerUsername = username;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
