package com.campuskey.backend.services;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.PropertyVerificationRepository;
import com.campuskey.backend.repositories.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RatingService {

    private static final double GLOBAL_MEAN = 4.0;
    private static final int MIN_REVIEWS = 5;
    private static final double VERIFIED_BOOST = 1.05; // +5%

    private final ReviewRepository reviewRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyVerificationRepository verificationRepository;

    public RatingService(
            ReviewRepository reviewRepository,
            PropertyRepository propertyRepository ,
            PropertyVerificationRepository verificationRepository) {
        this.reviewRepository = reviewRepository;
        this.propertyRepository = propertyRepository;
        this.verificationRepository=verificationRepository;
    }

    @Transactional
    public void updatePropertyRating(Long propertyId) {

        long reviewCount = reviewRepository.countByPropertyId(propertyId);
        double avgScore = reviewRepository.averageWeightedScore(propertyId);

        double bayesianRating = ((reviewCount * avgScore)
                + (MIN_REVIEWS * GLOBAL_MEAN))
                / (reviewCount + MIN_REVIEWS);

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new EntityNotFoundException("Property not found"));


        boolean isVerified = verificationRepository
                .findByPropertyId(propertyId)
                .map(v -> v.getStatus() == PropertyStatus.APPROVED)
                .orElse(false);

        if (isVerified) {
            bayesianRating *= VERIFIED_BOOST;
        }


        // Cap at 5.0
        bayesianRating = Math.min(bayesianRating, 5.0);

        property.setRating(round(bayesianRating));
        property.setReviewCount(reviewCount);

        propertyRepository.save(property);
    }

    private double round(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
