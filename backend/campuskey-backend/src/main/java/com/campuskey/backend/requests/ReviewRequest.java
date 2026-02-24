package com.campuskey.backend.requests;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;


public class ReviewRequest {

    @Min(1) @Max(5)
    @Setter
    @Getter
    private double security;

    @Min(1) @Max(5)
    @Setter
    @Getter
    private double cleanliness;

    @Min(1) @Max(5)
    @Setter
    @Getter
    private double distance;

    @Min(1) @Max(5)
    @Setter
    @Getter
    private double price;

    @Min(1) @Max(5)
    @Setter
    @Getter
    private double amenities;


}
