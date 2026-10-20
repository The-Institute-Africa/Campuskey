package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.BookingDto;
import com.campuskey.backend.dto.BookingRequest;
import com.campuskey.backend.entities.enumerations.BookingStatus;
import com.campuskey.backend.services.BookingService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campuskey")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/student/bookings/{propertyId}")
    public BookingDto create(@AuthenticationPrincipal UserDetails user, @PathVariable Long propertyId,
                             @Valid @RequestBody BookingRequest request) {
        return bookingService.create(user.getUsername(), propertyId, request);
    }

    @GetMapping("/student/bookings")
    public List<BookingDto> studentBookings(@AuthenticationPrincipal UserDetails user) {
        return bookingService.forStudent(user.getUsername());
    }

    @PostMapping("/student/bookings/{id}/cancel")
    public BookingDto cancel(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return bookingService.cancel(user.getUsername(), id);
    }

    @GetMapping("/landlord/bookings")
    public List<BookingDto> landlordBookings(@AuthenticationPrincipal UserDetails user) {
        return bookingService.forLandlord(user.getUsername());
    }

    @PutMapping("/landlord/bookings/{id}/status")
    public BookingDto updateStatus(@AuthenticationPrincipal UserDetails user, @PathVariable Long id,
                                   @RequestParam BookingStatus status) {
        return bookingService.updateStatus(user.getUsername(), id, status);
    }
}
