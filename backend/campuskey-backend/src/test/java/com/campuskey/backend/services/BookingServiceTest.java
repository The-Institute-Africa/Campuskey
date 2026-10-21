package com.campuskey.backend.services;

import com.campuskey.backend.dto.BookingDto;
import com.campuskey.backend.dto.BookingRequest;
import com.campuskey.backend.entities.Booking;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyVerification;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.BookingStatus;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.BookingRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class BookingServiceTest {

    @Mock private BookingRepository bookingRepository;
    @Mock private StudentRepository studentRepository;
    @Mock private LandlordRepository landlordRepository;
    @Mock private PropertyRepository propertyRepository;
    @InjectMocks private BookingService bookingService;

    @Test
    void createsBookingForApprovedListingAndOwningStudent() {
        Student student = student("student");
        Property property = property();
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student")).thenReturn(Optional.of(student));
        when(propertyRepository.findById(10L)).thenReturn(Optional.of(property));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(call -> call.getArgument(0));

        BookingDto result = bookingService.create("student", 10L,
                new BookingRequest(LocalDate.now().plusDays(1), LocalDate.now().plusDays(8), "  Please contact me  "));

        assertEquals("PENDING", result.status());
        assertEquals("Please contact me", result.message());
        verify(bookingRepository).save(any(Booking.class));
    }

    @Test
    void refusesBookingForUnapprovedListing() {
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student")).thenReturn(Optional.of(student("student")));
        Property property = property();
        property.setVerification(new PropertyVerification(property));
        when(propertyRepository.findById(10L)).thenReturn(Optional.of(property));

        assertThrows(EntityNotFoundException.class, () -> bookingService.create("student", 10L,
                new BookingRequest(LocalDate.now().plusDays(1), LocalDate.now().plusDays(8), null)));

        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void landlordCanOnlyDecideBookingsForTheirOwnProperties() {
        Landlord landlord = landlord("landlord");
        when(landlordRepository.findByOwnerUsername("landlord")).thenReturn(Optional.of(landlord));
        when(bookingRepository.findByIdAndProperty_Landlord(12L, landlord)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> bookingService.updateStatus(
                "landlord", 12L, BookingStatus.CONFIRMED));

        verify(bookingRepository, never()).save(any(Booking.class));
    }

    @Test
    void studentCannotCancelAnotherStudentsBooking() {
        Student student = student("student");
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student")).thenReturn(Optional.of(student));
        when(bookingRepository.findByIdAndStudent(12L, student)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> bookingService.cancel("student", 12L));
    }

    private Student student(String username) {
        Student student = new Student();
        student.setStudentName("Student Name");
        student.setOwnerUsername(username);
        return student;
    }

    private Landlord landlord(String username) {
        User user = new User();
        user.setUserName(username);
        Landlord landlord = new Landlord();
        landlord.setUser(user);
        return landlord;
    }

    private Property property() {
        Property property = new Property();
        property.setId(10L);
        property.setName("Campus House");
        property.setSlug("campus-house");
        property.setVerification(new PropertyVerification(property));
        property.getVerification().setStatus(PropertyStatus.APPROVED);
        return property;
    }
}
