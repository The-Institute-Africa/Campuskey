package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.InquiryDto;
import com.campuskey.backend.dto.InquiryRequest;
import com.campuskey.backend.dto.InquiryResponseRequest;
import com.campuskey.backend.services.InquiryService;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campuskey")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping("/student/inquiries/{propertyId}")
    public InquiryDto create(@AuthenticationPrincipal UserDetails user, @PathVariable Long propertyId,
                             @Valid @RequestBody InquiryRequest request) {
        return inquiryService.create(user.getUsername(), propertyId, request);
    }

    @GetMapping("/student/inquiries")
    public List<InquiryDto> studentInquiries(@AuthenticationPrincipal UserDetails user) {
        return inquiryService.forStudent(user.getUsername());
    }

    @PostMapping("/student/inquiries/{id}/close")
    public InquiryDto close(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return inquiryService.close(user.getUsername(), id);
    }

    @GetMapping("/landlord/inquiries")
    public List<InquiryDto> landlordInquiries(@AuthenticationPrincipal UserDetails user) {
        return inquiryService.forLandlord(user.getUsername());
    }

    @PostMapping("/landlord/inquiries/{id}/response")
    public InquiryDto respond(@AuthenticationPrincipal UserDetails user, @PathVariable Long id,
                              @Valid @RequestBody InquiryResponseRequest request) {
        return inquiryService.respond(user.getUsername(), id, request.response());
    }
}
