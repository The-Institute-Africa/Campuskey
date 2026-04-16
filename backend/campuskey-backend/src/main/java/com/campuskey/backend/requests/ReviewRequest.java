package com.campuskey.backend.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
// lombok imports removed - will add manual getters/setters


public class ReviewRequest {

    @Min(1) @Max(5)
    private double security;

    @Min(1) @Max(5)
    private double cleanliness;

    @Min(1) @Max(5)
    private double distance;

    @Min(1) @Max(5)
    private double price;

    @Min(1) @Max(5)
    private double amenities;

    // manual getters and setters
    public double getSecurity() { return security; }
    public void setSecurity(double security) { this.security = security; }

    public double getCleanliness() { return cleanliness; }
    public void setCleanliness(double cleanliness) { this.cleanliness = cleanliness; }

    public double getDistance() { return distance; }
    public void setDistance(double distance) { this.distance = distance; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getAmenities() { return amenities; }
    public void setAmenities(double amenities) { this.amenities = amenities; }


}
