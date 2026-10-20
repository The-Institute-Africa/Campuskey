package com.campuskey.backend.services;

import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyVerification;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.StudentFavorite;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentFavoriteRepository;
import com.campuskey.backend.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentFavoriteServiceTest {

    @Mock private StudentFavoriteRepository favoriteRepository;
    @Mock private StudentRepository studentRepository;
    @Mock private PropertyRepository propertyRepository;
    @InjectMocks private StudentFavoriteService favoriteService;

    @Test
    void addingFavoriteRequiresApprovedListing() {
        Student student = new Student();
        student.setOwnerUsername("student");
        Property property = new Property();
        property.setVerification(new PropertyVerification(property));
        when(studentRepository.findByOwnerUsername("student")).thenReturn(Optional.of(student));
        when(propertyRepository.findById(20L)).thenReturn(Optional.of(property));

        assertThrows(EntityNotFoundException.class, () -> favoriteService.add("student", 20L));
        verify(favoriteRepository, never()).save(any());
    }

    @Test
    void repeatedFavoriteAddDoesNotCreateDuplicate() {
        Student student = new Student();
        student.setOwnerUsername("student");
        Property property = new Property();
        PropertyVerification verification = new PropertyVerification(property);
        verification.setStatus(PropertyStatus.APPROVED);
        property.setVerification(verification);
        when(studentRepository.findByOwnerUsername("student")).thenReturn(Optional.of(student));
        when(propertyRepository.findById(20L)).thenReturn(Optional.of(property));
        when(favoriteRepository.findByStudentAndProperty_Id(student, 20L))
                .thenReturn(Optional.of(new StudentFavorite(student, property)));

        favoriteService.add("student", 20L);

        verify(favoriteRepository, never()).save(any());
    }

    @Test
    void addsApprovedListingToStudentFavorites() {
        Student student = new Student();
        student.setOwnerUsername("student");
        Property property = new Property();
        PropertyVerification verification = new PropertyVerification(property);
        verification.setStatus(PropertyStatus.APPROVED);
        property.setVerification(verification);
        when(studentRepository.findByOwnerUsername("student")).thenReturn(Optional.of(student));
        when(propertyRepository.findById(20L)).thenReturn(Optional.of(property));
        when(favoriteRepository.findByStudentAndProperty_Id(student, 20L)).thenReturn(Optional.empty());

        favoriteService.add("student", 20L);

        verify(favoriteRepository).save(any(StudentFavorite.class));
    }
}
