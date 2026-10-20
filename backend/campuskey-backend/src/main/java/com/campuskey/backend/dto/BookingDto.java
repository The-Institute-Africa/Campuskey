package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Booking;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingDto(
        Long id,
        Long propertyId,
        String propertyName,
        String propertySlug,
        String studentName,
        LocalDate startDate,
        LocalDate endDate,
        String message,
        String status,
        LocalDateTime createdAt
) {
    public BookingDto(Booking booking) {
        this(
                booking.getId(),
                booking.getProperty().getId(),
                booking.getProperty().getName(),
                booking.getProperty().getSlug(),
                booking.getStudent().getStudentName(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getMessage(),
                booking.getStatus().name(),
                booking.getCreatedAt()
        );
    }
}
