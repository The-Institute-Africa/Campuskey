package com.campuskey.backend.modules.reviews.controller;

import com.campuskey.backend.modules.reviews.dto.ReviewDto;
import com.campuskey.backend.modules.reviews.services.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/campuskey/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public Page<ReviewDto> listByProperty(@RequestParam Long propertyId, Pageable pageable) {
        return reviewService.listByProperty(propertyId, pageable);
    }

    @PostMapping("/{propertyId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public ReviewDto create(@PathVariable Long propertyId,
                            @Valid @RequestBody ReviewDto request,
                            Authentication authentication) {
        return reviewService.createReview(propertyId, request, authentication);
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public ReviewDto update(@PathVariable Long reviewId,
                            @Valid @RequestBody ReviewDto request,
                            Authentication authentication) {
        return reviewService.updateReview(reviewId, request, authentication);
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public void delete(@PathVariable Long reviewId, Authentication authentication) {
        reviewService.deleteReview(reviewId, authentication);
    }
}

