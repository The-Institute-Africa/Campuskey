package com.campuskey.backend.modules.reviews.services;

import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.exceptions.ForbiddenException;
import com.campuskey.backend.exceptions.ResourceNotFoundException;
import com.campuskey.backend.modules.reviews.dto.ReviewDto;
import com.campuskey.backend.modules.reviews.entity.Review;
import com.campuskey.backend.modules.reviews.mapper.ReviewMapper;
import com.campuskey.backend.modules.reviews.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ReviewService {

	private static final Logger log = LoggerFactory.getLogger(ReviewService.class);

	private final ReviewRepository reviewRepository;
	private final ReviewMapper reviewMapper;

	@Transactional(readOnly = true)
	public Page<ReviewDto> listByProperty(Long propertyId, Pageable pageable) {
		log.info("Listing reviews for propertyId={} page={} size={}",
				propertyId, pageable.getPageNumber(), pageable.getPageSize());
		return reviewRepository.findByPropertyIdAndActiveTrue(propertyId, pageable).map(reviewMapper::toDto);
	}

	@Transactional
	public ReviewDto createReview(Long propertyId, ReviewDto request, Authentication authentication) {
		validateRequest(propertyId, request);
		String username = authentication.getName();
		log.info("Creating review for propertyId={} by username={}", propertyId, username);

		Review review = new Review();
		review.setPropertyId(propertyId);
		review.setReviewerUsername(username);
		reviewMapper.applyEditableFields(review, request);

		Review saved = reviewRepository.save(review);
		return reviewMapper.toDto(saved);
	}

	@Transactional
	public ReviewDto updateReview(Long reviewId, ReviewDto request, Authentication authentication) {
		Review review = reviewRepository.findById(reviewId)
				.orElseThrow(() -> new ResourceNotFoundException("Review not found: " + reviewId));

		enforceOwnerOrAdmin(review, authentication);
		validateRequest(review.getPropertyId(), request);

		reviewMapper.applyEditableFields(review, request);
		Review saved = reviewRepository.save(review);
		log.info("Updated reviewId={} by username={}", reviewId, authentication.getName());
		return reviewMapper.toDto(saved);
	}

	@Transactional
	public void deleteReview(Long reviewId, Authentication authentication) {
		Review review = reviewRepository.findById(reviewId)
				.orElseThrow(() -> new ResourceNotFoundException("Review not found: " + reviewId));

		enforceOwnerOrAdmin(review, authentication);
		review.setActive(false);
		reviewRepository.save(review);
		log.info("Soft deleted reviewId={} by username={}", reviewId, authentication.getName());
	}

	private void validateRequest(Long propertyId, ReviewDto request) {
		if (propertyId == null || propertyId <= 0) {
			throw new BadRequestException("propertyId must be a positive number.");
		}
		if (request == null) {
			throw new BadRequestException("Review payload is required.");
		}
		if (request.rating() == null || request.rating() < 1 || request.rating() > 5) {
			throw new BadRequestException("rating must be between 1 and 5.");
		}
		if (request.comment() == null || request.comment().isBlank()) {
			throw new BadRequestException("comment is required.");
		}
		if (request.comment().length() > 1000) {
			throw new BadRequestException("comment must not exceed 1000 characters.");
		}
	}

	private void enforceOwnerOrAdmin(Review review, Authentication authentication) {
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
		boolean isOwner = review.getReviewerUsername().equals(authentication.getName());
		if (!isAdmin && !isOwner) {
			throw new ForbiddenException("You do not have permission to modify this review.");
		}
	}
}

