package com.campuskey.backend.services;

import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.Review;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.ReviewRepository;
import com.campuskey.backend.requests.ReviewRequest;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final PropertyRepository propertyRepository;
    private final RatingService ratingService;

    public ReviewService(
            ReviewRepository reviewRepository,
            PropertyRepository propertyRepository,
            RatingService ratingService) {
        this.reviewRepository = reviewRepository;
        this.propertyRepository = propertyRepository;
        this.ratingService = ratingService;
    }

    @Transactional
    public void createReview(Long propertyId, ReviewRequest request) {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found"));

        Review review = new Review();
        review.setProperty(property);
        review.setSecurity(BigDecimal.valueOf(request.getSecurity()));
        review.setCleanliness(BigDecimal.valueOf(request.getCleanliness()));
        review.setDistance(BigDecimal.valueOf(request.getDistance()));
        review.setPrice(BigDecimal.valueOf(request.getPrice()));
        review.setAmenities(BigDecimal.valueOf(request.getAmenities()));


        reviewRepository.save(review);

        ratingService.updatePropertyRating(propertyId);
    }


    private double calculateWeightedScore(ReviewRequest r) {

        return (r.getSecurity() * 0.25)
             + (r.getCleanliness() * 0.20)
             + (r.getDistance() * 0.20)
             + (r.getPrice() * 0.20)
             + (r.getAmenities() * 0.15);
    }
}
