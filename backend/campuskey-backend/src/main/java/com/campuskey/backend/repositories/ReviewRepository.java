package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Count total reviews for a Property
    @Query("""
        SELECT COUNT(r)
        FROM Review r
        WHERE r.property.id = :propertyId
    """)
    long countByPropertyId(@Param("propertyId") Long propertyId);

    // Average weighted score for a Property
    @Query("""
        SELECT COALESCE(AVG(r.weightedScore), 0)
        FROM Review r
        WHERE r.property.id = :propertyId
    """)
    double averageWeightedScore(@Param("propertyId") Long propertyId);

    @Query("""
        SELECT AVG(r.weightedScore)
        FROM Review r
        WHERE r.property.landlord = :landlord
    """)
    Double averageWeightedReview(@Param("landlord") Landlord landlord);
}
