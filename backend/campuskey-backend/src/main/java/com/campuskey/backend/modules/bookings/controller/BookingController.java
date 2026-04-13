package com.campuskey.backend.modules.bookings.controller;

import com.campuskey.backend.modules.bookings.dto.BookingDto;
import com.campuskey.backend.modules.bookings.services.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/campuskey/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public Page<BookingDto> listCurrentUserBookings(Authentication authentication, Pageable pageable) {
        return bookingService.listCurrentUserBookings(authentication, pageable);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public BookingDto createBooking(@Valid @RequestBody BookingDto request, Authentication authentication) {
        return bookingService.createBooking(request, authentication);
    }

    @PatchMapping("/{bookingId}/cancel")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public BookingDto cancelBooking(@PathVariable Long bookingId, Authentication authentication) {
        return bookingService.cancelBooking(bookingId, authentication);
    }
}

