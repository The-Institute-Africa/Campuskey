package com.campuskey.backend.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal security;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal cleanliness;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal distance;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal price;

    @Column(nullable = false, precision = 2, scale = 1)
    private BigDecimal amenities;

    @Column(name = "weighted_score", nullable = false, precision = 3, scale = 2)
    private BigDecimal weightedScore;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Version
    @Column(nullable = false)
    private Long version = 0L;

    /* ---------------- LIFECYCLE ---------------- */

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        calculateWeightedScore();
    }

    @PreUpdate
    protected void onUpdate() {
        calculateWeightedScore();
    }

    /* ---------------- BUSINESS LOGIC ---------------- */

    private void calculateWeightedScore() {
        this.weightedScore =
                security.multiply(BigDecimal.valueOf(0.30))
                        .add(cleanliness.multiply(BigDecimal.valueOf(0.25)))
                        .add(distance.multiply(BigDecimal.valueOf(0.20)))
                        .add(price.multiply(BigDecimal.valueOf(0.15)))
                        .add(amenities.multiply(BigDecimal.valueOf(0.10)))
                        .setScale(2, RoundingMode.HALF_UP);
    }

    /* ---------------- GETTERS & SETTERS ---------------- */

    public Long getId() {
        return id;
    }

    public Property getProperty() {
        return property ;
    }

    public void setProperty(Property  property) {
        this.property = property;
    }

    public BigDecimal getSecurity() {
        return security;
    }

    public void setSecurity(BigDecimal security) {
        this.security = security;
    }

    public BigDecimal getCleanliness() {
        return cleanliness;
    }

    public void setCleanliness(BigDecimal cleanliness) {
        this.cleanliness = cleanliness;
    }

    public BigDecimal getDistance() {
        return distance;
    }

    public void setDistance(BigDecimal distance) {
        this.distance = distance;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public BigDecimal getAmenities() {
        return amenities;
    }

    public void setAmenities(BigDecimal amenities) {
        this.amenities = amenities;
    }

    public BigDecimal getWeightedScore() {
        return weightedScore;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
