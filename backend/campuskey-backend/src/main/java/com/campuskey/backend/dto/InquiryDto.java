package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Inquiry;

import java.time.LocalDateTime;

public record InquiryDto(
        Long id,
        Long propertyId,
        String propertyName,
        String propertySlug,
        Long studentId,
        Long landlordId,
        String studentName,
        java.math.BigInteger studentContact,
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
                inquiry.getStudent().getId(),
                inquiry.getProperty().getLandlord().getId(),
                inquiry.getStudent().getStudentName(),
                inquiry.getStudent().getStudentContact(),
                inquiry.getMessage(),
                inquiry.getResponse(),
                inquiry.getStatus().name(),
                inquiry.getCreatedAt(),
                inquiry.getUpdatedAt()
        );
    }
}
