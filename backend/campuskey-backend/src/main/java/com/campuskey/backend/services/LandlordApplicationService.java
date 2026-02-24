package com.campuskey.backend.services;

import com.campuskey.backend.dto.LandlordVerificationDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigInteger;
import java.math.BigDecimal;
@Service
public class LandlordApplicationService {

    @Autowired
    LandlordService landlordService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    LandlordVerificationService landlordVerificationService;
    @Transactional
    public void apply(
            String name,
            String phone,
            String address,
            String idNumber,
            MultipartFile file,
            String username
    ) throws IOException, IllegalAccessException {

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalStateException("User not found"));


        // 1️⃣ Create landlord profile
        Landlord landlord = new Landlord();
        landlord.setName(name);
        try {
            landlord.setContact(new BigInteger(phone));
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid phone number format");
        }
        landlord.setIdNumber(idNumber);
        landlord.setAddress(address);
        landlord.setUser(user);
        landlord.setOwnerUsername(username);
        landlordService.addLandlord(landlord, username);

        // 2️⃣ Create verification application
        LandlordVerificationDto dto = new LandlordVerificationDto();
        dto.setLandlordId(landlord.getId());
        dto.setAddress(address);
        dto.setIdNumber(idNumber);
        dto.setAccountStatus(AccountStatus.PENDING);
        dto.setOwnerusername(username);

        landlordVerificationService.create(dto, file);

        user.setAccountStatus(AccountStatus.PENDING);
        userRepository.save(user);
    }
}
