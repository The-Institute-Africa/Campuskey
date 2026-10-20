package com.campuskey.backend.services;

import com.campuskey.backend.dto.LandlordVerificationDto;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.LandlordVerification;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.LandlordVerificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class LandlordVerificationService {

    private final LandlordVerificationRepository verificationRepo;
    private final LandlordRepository landlordRepo;
    private final VerificationDocumentStorage documentStorage;

    public LandlordVerificationService(LandlordVerificationRepository verificationRepo,
                                       LandlordRepository landlordRepo,
                                       VerificationDocumentStorage documentStorage) {
        this.verificationRepo = verificationRepo;
        this.landlordRepo = landlordRepo;
        this.documentStorage = documentStorage;
    }

    public List<LandlordVerificationDto> getAll() {
        return verificationRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public LandlordVerificationDto create(LandlordVerificationDto dto , MultipartFile file)  throws IOException {

        if (verificationRepo.existsByLandlordId(dto.getLandlordId())) {
            throw new IllegalStateException("Landlord has already submitted a verification request.");
        }

        Landlord landlord = landlordRepo.findById(dto.getLandlordId())
                .orElseThrow(() -> new RuntimeException("Landlord not found"));

        LandlordVerification verification = new LandlordVerification();

        verification.setDocumentPath(documentStorage.store(file, "landlord/verification"));

        verification.setAddress(dto.getAddress());
        verification.setIdNumber(dto.getIdNumber());
        verification.setLandlord(landlord);
        verification.setAccountStatus(AccountStatus.PENDING);
        verification.setOwnerUsername(dto.getOwnerusername());
        LandlordVerification saved = verificationRepo.save(verification);
        return mapToDTO(saved);
    }

    public Optional<LandlordVerificationDto> getById(Long id) {
        return verificationRepo.findById(id).map(this::mapToDTO);
    }

    public VerificationDocumentStorage.StoredDocument getDocument(Long id) throws IOException {
        LandlordVerification verification = verificationRepo.findById(id)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Verification record not found"));
        return documentStorage.load(verification.getDocumentPath());
    }

    private LandlordVerificationDto mapToDTO(LandlordVerification v) {
        return new LandlordVerificationDto(
                v.getId(),
                v.getAddress(),
                v.getIdNumber(),
                v.getLandlord() != null ? v.getLandlord().getId() : null,
                v.getAccountStatus(),
                v.getDocumentPath() == null ? null : "/api/v1/campuskey/admin/landlords/verifications/"
                        + v.getId() + "/document",
                v.getOwnerusername()
        );
    }
}
