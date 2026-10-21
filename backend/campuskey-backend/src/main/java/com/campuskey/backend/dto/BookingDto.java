package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Booking;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record BookingDto(
        Long id,
        Long propertyId,
        String propertyName,
        String propertySlug,
        Long studentId,
        Long landlordId,
        String studentName,
        java.math.BigInteger studentContact,
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
                booking.getStudent().getId(),
                booking.getProperty().getLandlord().getId(),
                booking.getStudent().getStudentName(),
                booking.getStudent().getStudentContact(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getMessage(),
                booking.getStatus().name(),
                booking.getCreatedAt()
        );
    }
}
