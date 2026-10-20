package com.campuskey.backend.services;

import com.campuskey.backend.dto.InquiryDto;
import com.campuskey.backend.dto.InquiryRequest;
import com.campuskey.backend.entities.Inquiry;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.enumerations.InquiryStatus;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.InquiryRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;
    private final PropertyRepository propertyRepository;

    public InquiryService(InquiryRepository inquiryRepository, StudentRepository studentRepository,
                          LandlordRepository landlordRepository, PropertyRepository propertyRepository) {
        this.inquiryRepository = inquiryRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
        this.propertyRepository = propertyRepository;
    }

    @Transactional
    public InquiryDto create(String username, Long propertyId, InquiryRequest request) {
        Student student = findStudent(username);
        Property property = propertyRepository.findById(propertyId)
                .filter(this::isPubliclyInquirable)
                .orElseThrow(() -> new EntityNotFoundException("Property not found"));
        return new InquiryDto(inquiryRepository.save(new Inquiry(student, property, request.message().strip())));
    }

    @Transactional(readOnly = true)
    public List<InquiryDto> forStudent(String username) {
        Student student = findStudent(username);
        return inquiryRepository.findAllByStudentOrderByCreatedAtDesc(student)
                .stream().map(InquiryDto::new).toList();
    }

    @Transactional(readOnly = true)
    public List<InquiryDto> forLandlord(String username) {
        Landlord landlord = findLandlord(username);
        return inquiryRepository.findAllByProperty_LandlordOrderByCreatedAtDesc(landlord)
                .stream().map(InquiryDto::new).toList();
    }

    @Transactional
    public InquiryDto respond(String username, Long id, String response) {
        Landlord landlord = findLandlord(username);
        Inquiry inquiry = inquiryRepository.findByIdAndProperty_Landlord(id, landlord)
                .orElseThrow(() -> new EntityNotFoundException("Inquiry not found"));
        if (inquiry.getStatus() != InquiryStatus.OPEN) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Only open inquiries can be answered");
        }
        inquiry.setResponse(response.strip());
        inquiry.setStatus(InquiryStatus.RESPONDED);
        return new InquiryDto(inquiry);
    }

    @Transactional
    public InquiryDto close(String username, Long id) {
        Student student = findStudent(username);
        Inquiry inquiry = inquiryRepository.findByIdAndStudent(id, student)
                .orElseThrow(() -> new EntityNotFoundException("Inquiry not found"));
        if (inquiry.getStatus() == InquiryStatus.CLOSED) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Inquiry is already closed");
        }
        inquiry.setStatus(InquiryStatus.CLOSED);
        return new InquiryDto(inquiry);
    }

    private Student findStudent(String username) {
        return studentRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT, "Create a student profile before contacting landlords"));
    }

    private Landlord findLandlord(String username) {
        return landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Landlord profile not found"));
    }

    private boolean isPubliclyInquirable(Property property) {
        return property.getVerification() != null
                && property.getVerification().getStatus() == PropertyStatus.APPROVED;
    }
}
