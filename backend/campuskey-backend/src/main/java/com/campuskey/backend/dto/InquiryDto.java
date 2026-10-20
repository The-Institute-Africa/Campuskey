package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Inquiry;

import java.time.LocalDateTime;

public record InquiryDto(
        Long id,
        Long propertyId,
        String propertyName,
        String propertySlug,
        String studentName,
        String message,
        String response,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public InquiryDto(Inquiry inquiry) {
        this(
                inquiry.getId(),
                inquiry.getProperty().getId(),
                inquiry.getProperty().getName(),
                inquiry.getProperty().getSlug(),
                inquiry.getStudent().getStudentName(),
                inquiry.getMessage(),
                inquiry.getResponse(),
                inquiry.getStatus().name(),
                inquiry.getCreatedAt(),
                inquiry.getUpdatedAt()
        );
    }
}
