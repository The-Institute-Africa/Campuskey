package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.StudentFavorite;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentFavoriteRepository;
import com.campuskey.backend.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StudentFavoriteService {

    private final StudentFavoriteRepository favoriteRepository;
    private final StudentRepository studentRepository;
    private final PropertyRepository propertyRepository;

    public StudentFavoriteService(StudentFavoriteRepository favoriteRepository,
                                  StudentRepository studentRepository,
                                  PropertyRepository propertyRepository) {
        this.favoriteRepository = favoriteRepository;
        this.studentRepository = studentRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional(readOnly = true)
    public List<PropertyDto> list(String username) {
        Student student = findStudent(username);
        return favoriteRepository.findAllByStudentOrderByCreatedAtDesc(student).stream()
                .map(StudentFavorite::getProperty)
                .filter(this::isApproved)
                .map(PropertyDto::new)
                .toList();
    }

    @Transactional
    public void add(String username, Long propertyId) {
        Student student = findStudent(username);
        Property property = propertyRepository.findById(propertyId)
                .filter(this::isApproved)
                .orElseThrow(() -> new EntityNotFoundException("Approved property not found"));

        if (favoriteRepository.findByStudentAndProperty_Id(student, propertyId).isEmpty()) {
            favoriteRepository.save(new StudentFavorite(student, property));
        }
    }

    @Transactional
    public void remove(String username, Long propertyId) {
        Student student = findStudent(username);
        favoriteRepository.findByStudentAndProperty_Id(student, propertyId)
                .ifPresent(favoriteRepository::delete);
    }

    private Student findStudent(String username) {
        return studentRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.CONFLICT, "Create a student profile before saving properties"));
    }

    private boolean isApproved(Property property) {
        return property.getVerification() != null
                && property.getVerification().getStatus() == PropertyStatus.APPROVED;
    }
}
