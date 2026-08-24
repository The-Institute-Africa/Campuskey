package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.LandlordVerificationDto;
import com.campuskey.backend.entities.LandlordVerification;
import com.campuskey.backend.services.LandlordApplicationService;
import com.campuskey.backend.services.LandlordVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey")
public class LandlordVerificationController {

    private final LandlordVerificationService service;

    @Autowired
    LandlordApplicationService landlordApplicationService;
    public LandlordVerificationController(LandlordVerificationService service) {
        this.service = service;
    }

    @PostMapping(value = "/landlord/apply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    public void applyAsLandlord(
            @RequestPart("file") MultipartFile file,
            @RequestPart("name") String name,
            @RequestPart("phone") String phone,
            @RequestPart("address") String address,
            @RequestPart("idNumber") String idNumber,
            @AuthenticationPrincipal UserDetails userDetails
            ) throws IOException, IllegalAccessException {

        landlordApplicationService.apply(
                name,
                phone,
                address,
                idNumber,
                file,
                userDetails.getUsername()
        );
    }


}
