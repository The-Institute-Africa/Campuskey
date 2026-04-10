package com.campuskey.backend.modules.reviews.repository;

import com.campuskey.backend.modules.reviews.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

	Page<Review> findByPropertyIdAndActiveTrue(Long propertyId, Pageable pageable);

	Page<Review> findByReviewerUsernameIgnoreCaseAndActiveTrue(String reviewerUsername, Pageable pageable);
}

