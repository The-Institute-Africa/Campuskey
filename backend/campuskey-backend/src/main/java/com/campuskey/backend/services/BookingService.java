package com.campuskey.backend.services;

import com.campuskey.backend.dto.BookingDto;
import com.campuskey.backend.dto.BookingRequest;
import com.campuskey.backend.entities.Booking;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.enumerations.BookingStatus;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.BookingRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;
    private final PropertyRepository propertyRepository;

    public BookingService(BookingRepository bookingRepository, StudentRepository studentRepository,
                          LandlordRepository landlordRepository, PropertyRepository propertyRepository) {
        this.bookingRepository = bookingRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional
    public BookingDto create(String username, Long propertyId, BookingRequest request) {
        validateDates(request);
        Student student = findStudent(username);
        Property property = propertyRepository.findById(propertyId)
                .filter(this::isPubliclyBookable)
                .orElseThrow(() -> new EntityNotFoundException("Property not found"));
        return new BookingDto(bookingRepository.save(new Booking(
                student, property, request.startDate(), request.endDate(), clean(request.message()))));
    }

    @Transactional(readOnly = true)
    public List<BookingDto> forStudent(String username) {
        Student student = findStudent(username);
        return bookingRepository.findAllByStudentOrderByCreatedAtDesc(student)
                .stream().map(BookingDto::new).toList();
    }

    @Transactional(readOnly = true)
    public List<BookingDto> forLandlord(String username) {
        Landlord landlord = findLandlord(username);
        return bookingRepository.findAllByProperty_LandlordOrderByCreatedAtDesc(landlord)
                .stream().map(BookingDto::new).toList();
    }

    @Transactional
    public BookingDto updateStatus(String username, Long id, BookingStatus status) {
        if (status != BookingStatus.CONFIRMED && status != BookingStatus.REJECTED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Landlords can confirm or reject booking requests");
        }
        Landlord landlord = findLandlord(username);
        Booking booking = bookingRepository.findByIdAndProperty_Landlord(id, landlord)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only pending bookings can be decided");
        }
        booking.setStatus(status);
        return new BookingDto(booking);
    }

    @Transactional
    public BookingDto cancel(String username, Long id) {
        Student student = findStudent(username);
        Booking booking = bookingRepository.findByIdAndStudent(id, student)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only pending bookings can be cancelled");
        }
        booking.setStatus(BookingStatus.CANCELLED);
        return new BookingDto(booking);
    }

    private Student findStudent(String username) {
        return studentRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "Create a student profile before requesting accommodation"));
    }

    private Landlord findLandlord(String username) {
        return landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Landlord profile not found"));
    }

    private boolean isPubliclyBookable(Property property) {
        return property.getVerification() != null
                && property.getVerification().getStatus() == PropertyStatus.APPROVED;
    }

    private void validateDates(BookingRequest request) {
        if (request.startDate().isBefore(LocalDate.now()) || !request.endDate().isAfter(request.startDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Choose a future start date and a later end date");
        }
    }

    private String clean(String value) {
        return value == null || value.isBlank() ? null : value.strip();
    }
}
