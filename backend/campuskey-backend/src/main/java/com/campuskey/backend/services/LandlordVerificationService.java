package com.campuskey.backend.services;

import com.campuskey.backend.dto.LandlordVerificationDto;
import com.campuskey.backend.dto.PropertyVerificationDto;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyVerification;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.LandlordVerification;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.LandlordVerificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LandlordVerificationService {

    private final LandlordVerificationRepository verificationRepo;
    private final LandlordRepository landlordRepo;

    public LandlordVerificationService(LandlordVerificationRepository verificationRepo,
                                       LandlordRepository landlordRepo) {
        this.verificationRepo = verificationRepo;
        this.landlordRepo = landlordRepo;
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

        // ---------- LOCAL STORAGE ----------
        String uploadDir = "uploads/landlord/verification/";
        Files.createDirectories(Paths.get(uploadDir));

        String originalFilename = file.getOriginalFilename();
        String fileName = UUID.randomUUID() + "_" + originalFilename;
        Path filePath = Paths.get(uploadDir, fileName);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // store local path (for now)
        verification.setDocumentPath(filePath.toString());

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

    private LandlordVerificationDto mapToDTO(LandlordVerification v) {
        return new LandlordVerificationDto(
                v.getId(),
                v.getAddress(),
                v.getIdNumber(),
                v.getLandlord() != null ? v.getLandlord().getId() : null,
                v.getAccountStatus(),
                v.getDocumentPath(),
                v.getOwnerusername()
        );
    }
}
