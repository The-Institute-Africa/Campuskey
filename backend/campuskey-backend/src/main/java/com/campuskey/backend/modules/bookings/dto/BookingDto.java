package com.campuskey.backend.modules.bookings.dto;

import com.campuskey.backend.modules.bookings.entity.Booking.BookingStatus;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;
import java.time.LocalDate;

public record BookingDto(
        Long bookingId,
        @NotNull Long propertyId,
        String bookerUsername,
        @NotNull LocalDate startDate,
        @NotNull LocalDate endDate,
        BookingStatus status,
        Instant createdAt,
        Instant updatedAt
) {
}

