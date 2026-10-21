package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyVerificationDto;
import com.campuskey.backend.entities.*;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.PropertyVerificationRepository;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class PropertyVerificationService {

    private final PropertyRepository propertyRepository;
    private final PropertyVerificationRepository verificationRepository;
    private final VerificationDocumentStorage documentStorage;

    public PropertyVerificationService(PropertyRepository propertyRepository,
                                    PropertyVerificationRepository verificationRepository,
                                    VerificationDocumentStorage documentStorage) {
        this.propertyRepository = propertyRepository;
        this.verificationRepository = verificationRepository;
        this.documentStorage = documentStorage;
    }

    @Transactional
    public PropertyVerificationDto submitDocument(Long propertyId, MultipartFile file, String username) throws IOException {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));
        if (!username.equals(property.getLandlord().getUser().getUserName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to verify this property");
        }

        PropertyVerification pv = verificationRepository.findByPropertyId(propertyId)
                .orElseGet(() -> {
                    PropertyVerification newPv = new PropertyVerification();
                    newPv.setProperty(property);
                    newPv.setStatus(PropertyStatus.PENDING);
                    newPv.setSubmittedAt(LocalDateTime.now());

                    return newPv;
                });

        pv.setDocumentPath(documentStorage.store(file, "property/verification"));

        // reset verification state
        pv.setStatus(PropertyStatus.PENDING);
        pv.setInspector(null);
        pv.setVerifiedAt(null);

        verificationRepository.save(pv);

        return toDto(pv);
    }

    public VerificationDocumentStorage.StoredDocument getDocument(Long propertyId) throws IOException {
        PropertyVerification verification = verificationRepository.findByPropertyId(propertyId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Verification record not found"));
        return documentStorage.load(verification.getDocumentPath());
    }

    // ---------- APPROVE ----------
    public PropertyVerificationDto approveProperty(@AuthenticationPrincipal UserDetails userDetails ,
                                                   Long propertyId) {

       String username = userDetails.getUsername();

        PropertyVerification pv = verificationRepository.findByPropertyId(propertyId)
                .orElseThrow(() -> new RuntimeException("Verification record not found"));

        pv.setStatus(PropertyStatus.APPROVED);
        pv.setInspector(username);
        pv.setVerifiedAt(LocalDateTime.now());
        pv.setNotes("Successful Approved");

        verificationRepository.save(pv);

        return toDto(pv);
    }

    // ---------- REJECT ----------
    public PropertyVerificationDto rejectProperty(@AuthenticationPrincipal UserDetails userDetails ,
                                                  Long propertyId, String notes) {

        String username = userDetails.getUsername();

        PropertyVerification pv = verificationRepository.findByPropertyId(propertyId)
                .orElseThrow(() -> new RuntimeException("Verification record not found"));

        pv.setStatus(PropertyStatus.REJECTED);
        pv.setInspector(username);
        pv.setVerifiedAt(LocalDateTime.now());
        pv.setNotes(notes);

        verificationRepository.save(pv);

        return toDto(pv);
    }

    // ---------- Convert Entity → DTO ----------
    private PropertyVerificationDto toDto(PropertyVerification pv) {
        return new PropertyVerificationDto(
                pv.getId(),
                pv.getProperty().getId(),
                pv.getStatus().name(),
                pv.getInspector(),
                pv.getSubmittedAt(),
                pv.getVerifiedAt(),
                pv.getNotes(),
                pv.getDocumentPath() == null ? null
                        : "/api/v1/campuskey/admin/properties/" + pv.getProperty().getId()
                                + "/verification-document"
        );
    }
}
