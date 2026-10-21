package com.campuskey.backend.services;

import com.campuskey.backend.dto.ProfileDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Role;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.AccountState;
import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.repositories.BookingRepository;
import com.campuskey.backend.repositories.InquiryRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.StudentRepository;
import com.campuskey.backend.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {
    @Mock private UserRepository userRepository;
    @Mock private StudentRepository studentRepository;
    @Mock private LandlordRepository landlordRepository;
    @Mock private InquiryRepository inquiryRepository;
    @Mock private BookingRepository bookingRepository;
    @InjectMocks private ProfileService profileService;

    @Test
    void relatedStudentCanViewOnlySafeLandlordFieldsWhenLinked() {
        User user = user("student", AppRole.ROLE_STUDENT);
        Student student = student("student");
        Landlord landlord = landlord("landlord");
        when(userRepository.findByUserName("student")).thenReturn(Optional.of(user));
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student")).thenReturn(Optional.of(student));
        when(landlordRepository.findById(9L)).thenReturn(Optional.of(landlord));
        when(inquiryRepository.existsByStudent_IdAndProperty_Landlord_Id(3L, 9L)).thenReturn(true);

        ProfileDto result = profileService.landlordForStudent("student", 9L);

        assertEquals("Landlord Name", result.name());
        assertEquals(BigInteger.valueOf(263771234567L), result.contact());
        assertNull(result.address());
        assertNull(result.idNumber());
        assertNull(result.accountState());
    }

    @Test
    void refusesCounterpartProfileWithoutExistingInquiryOrBooking() {
        when(userRepository.findByUserName("student"))
                .thenReturn(Optional.of(user("student", AppRole.ROLE_STUDENT)));
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student"))
                .thenReturn(Optional.of(student("student")));
        when(landlordRepository.findById(9L)).thenReturn(Optional.of(landlord("landlord")));
        when(inquiryRepository.existsByStudent_IdAndProperty_Landlord_Id(3L, 9L)).thenReturn(false);
        when(bookingRepository.existsByStudent_IdAndProperty_Landlord_Id(3L, 9L)).thenReturn(false);

        ResponseStatusException error = assertThrows(ResponseStatusException.class,
                () -> profileService.landlordForStudent("student", 9L));

        assertEquals(HttpStatus.FORBIDDEN, error.getStatusCode());
    }

    @Test
    void landlordCanViewLinkedStudentNameAndContactButNotStudentNumberOrAddress() {
        User user = user("landlord", AppRole.ROLE_LANDLORD);
        Landlord landlord = landlord("landlord");
        Student student = student("student");
        when(userRepository.findByUserName("landlord")).thenReturn(Optional.of(user));
        when(landlordRepository.findByOwnerUsername("landlord")).thenReturn(Optional.of(landlord));
        when(studentRepository.findById(3L)).thenReturn(Optional.of(student));
        when(bookingRepository.existsByStudent_IdAndProperty_Landlord_Id(3L, 9L)).thenReturn(true);

        ProfileDto result = profileService.studentForLandlord("landlord", 3L);

        assertEquals("Student Name", result.name());
        assertNotNull(result.contact());
        assertNull(result.studentNumber());
        assertNull(result.address());
    }

    @Test
    void counterpartViewEnforcesRole() {
        when(userRepository.findByUserName("landlord"))
                .thenReturn(Optional.of(user("landlord", AppRole.ROLE_LANDLORD)));

        ResponseStatusException error = assertThrows(ResponseStatusException.class,
                () -> profileService.landlordForStudent("landlord", 9L));

        assertEquals(HttpStatus.FORBIDDEN, error.getStatusCode());
        verifyNoInteractions(studentRepository, landlordRepository, inquiryRepository, bookingRepository);
    }

    @Test
    void canSuspendAndReactivateWithoutDeletingProfile() {
        User user = user("student", AppRole.ROLE_STUDENT);
        when(userRepository.findByUserName("student")).thenReturn(Optional.of(user));

        assertEquals(AccountState.SUSPENDED,
                profileService.changeState("student", AccountState.SUSPENDED));
        assertEquals(AccountState.ACTIVE,
                profileService.changeState("student", AccountState.ACTIVE));
        verify(studentRepository, never()).delete(any());
        verify(landlordRepository, never()).delete(any());
    }

    @Test
    void softDeleteRedactsProfileAndPreservesStudentRow() {
        User user = user("student", AppRole.ROLE_STUDENT);
        Student student = student("student");
        when(userRepository.findByUserName("student")).thenReturn(Optional.of(user));
        when(studentRepository.findFirstByOwnerUsernameOrderByIdAsc("student")).thenReturn(Optional.of(student));

        assertEquals(AccountState.DELETED,
                profileService.changeState("student", AccountState.DELETED));

        assertEquals("Deleted account", student.getStudentName());
        assertNull(student.getStudentNumber());
        assertNull(student.getStudentContact());
        assertNull(student.getAddress());
        assertNull(student.getOwnerUsername());
        verify(studentRepository, never()).delete(any());
    }

    @Test
    void softDeleteRedactsLandlordPiiWithoutRemovingLandlordRecord() {
        User user = user("landlord", AppRole.ROLE_LANDLORD);
        Landlord landlord = landlord("landlord");
        when(userRepository.findByUserName("landlord")).thenReturn(Optional.of(user));
        when(landlordRepository.findByOwnerUsername("landlord")).thenReturn(Optional.of(landlord));

        assertEquals(AccountState.DELETED,
                profileService.changeState("landlord", AccountState.DELETED));

        assertEquals("Deleted account", landlord.getName());
        assertNull(landlord.getContact());
        assertNull(landlord.getAddress());
        assertNull(landlord.getIdNumber());
        verify(landlordRepository, never()).delete(any());
    }

    @Test
    void deletedAccountCannotBeReactivatedThroughSelfService() {
        User user = user("student", AppRole.ROLE_STUDENT);
        user.setAccountState(AccountState.DELETED);
        when(userRepository.findByUserName("student")).thenReturn(Optional.of(user));

        ResponseStatusException error = assertThrows(ResponseStatusException.class,
                () -> profileService.changeState("student", AccountState.ACTIVE));

        assertEquals(HttpStatus.CONFLICT, error.getStatusCode());
    }

    private User user(String username, AppRole role) {
        User user = new User();
        user.setUserName(username);
        user.setRole(new Role(role));
        return user;
    }

    private Student student(String username) {
        Student student = new Student();
        student.setId(3L);
        student.setOwnerUsername(username);
        student.setStudentName("Student Name");
        student.setStudentNumber("STU-300");
        student.setStudentContact(BigInteger.valueOf(263771234567L));
        student.setAddress("Private student address");
        return student;
    }

    private Landlord landlord(String username) {
        Landlord landlord = new Landlord();
        landlord.setId(9L);
        landlord.setOwnerUsername(username);
        landlord.setName("Landlord Name");
        landlord.setContact(BigInteger.valueOf(263771234567L));
        landlord.setIdNumber("PRIVATE-ID");
        landlord.setAddress("Private landlord address");
        return landlord;
    }
}
