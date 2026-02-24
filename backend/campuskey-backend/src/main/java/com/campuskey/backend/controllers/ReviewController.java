package com.campuskey.backend.controllers;

import com.campuskey.backend.requests.ReviewRequest;
import com.campuskey.backend.services.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/campuskey/public/")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<?> createReview(
            @PathVariable Long id,
            @RequestBody @Valid ReviewRequest request) {

        reviewService.createReview(id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Review submitted successfully");
    }
}
