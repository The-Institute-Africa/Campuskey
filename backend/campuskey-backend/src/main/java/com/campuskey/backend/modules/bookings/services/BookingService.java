package com.campuskey.backend.modules.bookings.services;

import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.exceptions.ForbiddenException;
import com.campuskey.backend.exceptions.ResourceNotFoundException;
import com.campuskey.backend.modules.bookings.dto.BookingDto;
import com.campuskey.backend.modules.bookings.entity.Booking;
import com.campuskey.backend.modules.bookings.entity.Booking.BookingStatus;
import com.campuskey.backend.modules.bookings.mapper.BookingMapper;
import com.campuskey.backend.modules.bookings.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class BookingService {

    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;

    @Transactional(readOnly = true)
    public Page<BookingDto> listCurrentUserBookings(Authentication authentication, Pageable pageable) {
        String username = authentication.getName();
        log.info("Listing bookings for username={} page={} size={}",
                username, pageable.getPageNumber(), pageable.getPageSize());
        return bookingRepository.findByBookerUsernameIgnoreCaseOrderByCreatedAtDesc(username, pageable)
                .map(bookingMapper::toDto);
    }

    @Transactional
    public BookingDto createBooking(BookingDto request, Authentication authentication) {
        validateBookingDates(request.startDate(), request.endDate());
        if (request.propertyId() == null || request.propertyId() <= 0) {
            throw new BadRequestException("propertyId must be a positive number.");
        }

        String username = authentication.getName();
        Booking booking = bookingMapper.fromCreateRequest(request, username);
        booking.setStatus(BookingStatus.REQUESTED);
        Booking saved = bookingRepository.save(booking);

        log.info("Created bookingId={} for username={} propertyId={}",
                saved.getBookingId(), username, saved.getPropertyId());
        return bookingMapper.toDto(saved);
    }

    @Transactional
    public BookingDto cancelBooking(Long bookingId, Authentication authentication) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found: " + bookingId));

        enforceOwnerOrAdmin(booking, authentication);
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            return bookingMapper.toDto(booking);
        }

        booking.setStatus(BookingStatus.CANCELLED);
        Booking saved = bookingRepository.save(booking);
        log.info("Cancelled bookingId={} by username={}", bookingId, authentication.getName());
        return bookingMapper.toDto(saved);
    }

    private void validateBookingDates(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            throw new BadRequestException("startDate and endDate are required.");
        }
        if (startDate.isBefore(LocalDate.now())) {
            throw new BadRequestException("startDate cannot be in the past.");
        }
        if (!endDate.isAfter(startDate)) {
            throw new BadRequestException("endDate must be after startDate.");
        }
    }

    private void enforceOwnerOrAdmin(Booking booking, Authentication authentication) {
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
        boolean isOwner = booking.getBookerUsername().equalsIgnoreCase(authentication.getName());
        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("You do not have permission to modify this booking.");
        }
    }
}

