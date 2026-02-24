package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyVerificationDto;
import com.campuskey.backend.entities.*;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.PropertyVerificationRepository;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PropertyVerificationService {

    private final PropertyRepository propertyRepository;
    private final PropertyVerificationRepository verificationRepository;


    public PropertyVerificationService(PropertyRepository propertyRepository,
                                    PropertyVerificationRepository verificationRepository) {
        this.propertyRepository = propertyRepository;
        this.verificationRepository = verificationRepository;
    }

    public PropertyVerificationDto submitDocument(Long propertyId, MultipartFile file) throws IOException {

        Property property = propertyRepository.findById(propertyId)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        PropertyVerification pv = verificationRepository.findByPropertyId(propertyId)
                .orElseGet(() -> {
                    PropertyVerification newPv = new PropertyVerification();
                    newPv.setProperty(property);
                    newPv.setStatus(PropertyStatus.PENDING);
                    newPv.setSubmittedAt(LocalDateTime.now());

                    return newPv;
                });

        // ---------- LOCAL STORAGE ----------
        String uploadDir = "uploads/verification/";
        Files.createDirectories(Paths.get(uploadDir));

        String originalFilename = file.getOriginalFilename();
        String fileName = UUID.randomUUID() + "_" + originalFilename;
        Path filePath = Paths.get(uploadDir, fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // store local path (for now)
        pv.setDocumentPath(filePath.toString());

        // reset verification state
        pv.setStatus(PropertyStatus.PENDING);
        pv.setInspector(null);
        pv.setVerifiedAt(null);

        verificationRepository.save(pv);

        return toDto(pv);
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
                pv.getDocumentPath()
        );
    }
}
