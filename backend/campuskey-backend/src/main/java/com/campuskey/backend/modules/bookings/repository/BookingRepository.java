package com.campuskey.backend.modules.bookings.repository;

import com.campuskey.backend.modules.bookings.entity.Booking;
import com.campuskey.backend.modules.bookings.entity.Booking.BookingStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    Page<Booking> findByBookerUsernameIgnoreCaseOrderByCreatedAtDesc(String bookerUsername, Pageable pageable);

    Page<Booking> findByPropertyIdAndStatus(Long propertyId, BookingStatus status, Pageable pageable);
}

