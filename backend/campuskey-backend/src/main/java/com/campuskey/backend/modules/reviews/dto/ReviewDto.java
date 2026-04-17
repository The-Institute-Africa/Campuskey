package com.campuskey.backend.modules.reviews.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record ReviewDto(
        Long reviewId,
        @NotNull Long propertyId,
        String reviewerUsername,
        @NotNull @Min(1) @Max(5) Integer rating,
        @NotBlank @Size(max = 1000) String comment,
        Instant createdAt,
        Instant updatedAt
) {
}

