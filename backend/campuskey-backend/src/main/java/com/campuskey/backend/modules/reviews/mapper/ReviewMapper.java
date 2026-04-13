package com.campuskey.backend.modules.reviews.mapper;

import com.campuskey.backend.modules.reviews.dto.ReviewDto;
import com.campuskey.backend.modules.reviews.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public ReviewDto toDto(Review review) {
        return new ReviewDto(
                review.getReviewId(),
                review.getPropertyId(),
                review.getReviewerUsername(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }

    public void applyEditableFields(Review review, ReviewDto request) {
        review.setRating(request.rating());
        review.setComment(request.comment().trim());
    }
}

