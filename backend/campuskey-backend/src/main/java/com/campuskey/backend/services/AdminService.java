package com.campuskey.backend.services;

import com.campuskey.backend.entities.*;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.LandlordVerificationRepository;
import com.campuskey.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final LandlordVerificationRepository landlordVerificationRepository;

    @Autowired
    LandlordRepository landlordRepository;

    @Autowired
    public AdminService(UserRepository userRepository,
                        LandlordVerificationRepository landlordVerificationRepository
                       ) {
        this.userRepository = userRepository;
        this.landlordVerificationRepository=landlordVerificationRepository;
    }


    public void suspendAccount(@AuthenticationPrincipal UserDetails userDetails,
                               String usernameToSuspend) {

        String adminUsername = userDetails.getUsername();

        // Prevent self-suspension
        if (adminUsername.equals(usernameToSuspend)) {
            throw new IllegalArgumentException("You cannot suspend your own account");
        }
        User user = userRepository.findByUserName(usernameToSuspend)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found: " + usernameToSuspend)
                );
        user.setEnabled(false);
        user.setAccountStatus(AccountStatus.SUSPENDED);
        userRepository.save(user);
    }

    @Transactional
    public void verifiedAccount(UserDetails userDetails,
                                String usernameToVerify,
                                String idNumber,
                                String address) {

        if (userDetails.getUsername().equals(usernameToVerify)) {
            throw new IllegalArgumentException("You cannot verify your own account");
        }

        User user = userRepository.findByUserName(usernameToVerify)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Landlord landlord = landlordRepository.findByOwnerUsername(usernameToVerify)
                .orElseThrow(() -> new EntityNotFoundException("Landlord not found"));

        LandlordVerification verification =
                landlordVerificationRepository.findByLandlord(landlord)
                        .orElseThrow(() ->
                                new EntityNotFoundException("Verification not found"));

        verification.setIdNumber(idNumber);
        verification.setAddress(address);

        verification.setAccountStatus(AccountStatus.VERIFIED);
        user.setAccountStatus(AccountStatus.VERIFIED);

        landlordVerificationRepository.save(verification);
        userRepository.save(user);
    }



    public void unverifyAccount(@AuthenticationPrincipal UserDetails userDetails,
                                String usernameToUnverify) {

        String adminUsername = userDetails.getUsername();

        // Prevent self-suspension
        if (adminUsername.equals(usernameToUnverify)) {
            throw new IllegalArgumentException("You cannot suspend your own account");
        }
        User user = userRepository.findByUserName(usernameToUnverify)
                .orElseThrow(() ->
                        new EntityNotFoundException("User not found: " + usernameToUnverify)
                );
        user.setEnabled(false);
        user.setAccountStatus(AccountStatus.UNVERIFIED);

        userRepository.save(user);
    }

}
