package com.campuskey.backend.modules.bookings.mapper;

import com.campuskey.backend.modules.bookings.dto.BookingDto;
import com.campuskey.backend.modules.bookings.entity.Booking;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    public BookingDto toDto(Booking booking) {
        return new BookingDto(
                booking.getBookingId(),
                booking.getPropertyId(),
                booking.getBookerUsername(),
                booking.getStartDate(),
                booking.getEndDate(),
                booking.getStatus(),
                booking.getCreatedAt(),
                booking.getUpdatedAt()
        );
    }

    public Booking fromCreateRequest(BookingDto request, String username) {
        Booking booking = new Booking();
        booking.setPropertyId(request.propertyId());
        booking.setBookerUsername(username);
        booking.setStartDate(request.startDate());
        booking.setEndDate(request.endDate());
        return booking;
    }
}

