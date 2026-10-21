package com.campuskey.backend.services;

import com.campuskey.backend.dto.InquiryDto;
import com.campuskey.backend.entities.Inquiry;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyVerification;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.InquiryStatus;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.InquiryRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InquiryServiceTest {

    @Mock private InquiryRepository inquiryRepository;
    @Mock private StudentRepository studentRepository;
    @Mock private LandlordRepository landlordRepository;
    @Mock private PropertyRepository propertyRepository;
    @InjectMocks private InquiryService inquiryService;

    @Test
    void landlordCanRespondOnlyToInquiryForTheirOwnProperty() {
        Landlord landlord = landlord("landlord");
        when(landlordRepository.findByOwnerUsername("landlord")).thenReturn(Optional.of(landlord));
        when(inquiryRepository.findByIdAndProperty_Landlord(12L, landlord)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> inquiryService.respond("landlord", 12L, "Thanks"));
    }

    @Test
    void landlordResponseMovesOpenInquiryToResponded() {
        Landlord landlord = landlord("landlord");
        Inquiry inquiry = new Inquiry(student(), property(), "Is this available?");
        when(landlordRepository.findByOwnerUsername("landlord")).thenReturn(Optional.of(landlord));
        when(inquiryRepository.findByIdAndProperty_Landlord(12L, landlord)).thenReturn(Optional.of(inquiry));

        InquiryDto result = inquiryService.respond("landlord", 12L, "  Yes, it is available.  ");

        assertEquals(InquiryStatus.RESPONDED.name(), result.status());
        assertEquals("Yes, it is available.", result.response());
    }

    @Test
    void studentCannotCloseAnotherStudentsInquiry() {
        Student student = student();
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student")).thenReturn(Optional.of(student));
        when(inquiryRepository.findByIdAndStudent(12L, student)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> inquiryService.close("student", 12L));
    }

    private Student student() {
        Student student = new Student();
        student.setStudentName("Student Name");
        student.setOwnerUsername("student");
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
        PropertyVerification verification = new PropertyVerification(property);
        verification.setStatus(PropertyStatus.APPROVED);
        property.setVerification(verification);
        return property;
    }
}
