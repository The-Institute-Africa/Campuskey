package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.LandlordVerificationDto;
import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.PropertyVerificationDto;
import com.campuskey.backend.services.AdminService;
import com.campuskey.backend.services.LandlordVerificationService;
import com.campuskey.backend.services.PropertyService;
import com.campuskey.backend.services.PropertyVerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.core.io.Resource;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/campuskey/admin")
public class AdminController {

    private final AdminService adminService;
    private final PropertyVerificationService verificationService;
    private final LandlordVerificationService landlordVerificationService;
    private final PropertyService propertyService;
    @Autowired
    private AdminController(AdminService adminService , PropertyVerificationService verificationService ,
                            LandlordVerificationService landlordVerificationService ,
                            PropertyService propertyService) {
        this.verificationService = verificationService;
        this.adminService=adminService;
        this.landlordVerificationService=landlordVerificationService;
        this.propertyService=propertyService;
    }

    @GetMapping("/properties")
    public List<PropertyDto> getAllProperties() {
        return propertyService.getPropertiesForAdmin();
    }

    @PutMapping("/suspend/{account}")
    public ResponseEntity<Void> suspendAccount(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("account") String accountToSuspend) {

        adminService.suspendAccount(userDetails, accountToSuspend);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/verified/{account}")
    public ResponseEntity<Void> verifyAccount(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("account") String accountToVerify ,
            @RequestParam String idNumber,
            @RequestParam String address
            ) {

        adminService.verifiedAccount(userDetails, accountToVerify,idNumber,address);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/unverified/{account}")
    public ResponseEntity<Void> unverifiedAccount(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("account") String accountToUnverify) {

        adminService.unverifyAccount(userDetails, accountToUnverify);
        return ResponseEntity.noContent().build();
    }

    // ---------- Approve ----------
    @PostMapping("/{propertyId}/approve")
    public ResponseEntity<PropertyVerificationDto> approve(@AuthenticationPrincipal UserDetails userDetails ,
                                                           @PathVariable Long propertyId) {
        return ResponseEntity.ok(verificationService.approveProperty(userDetails,propertyId));
    }

    // ---------- Reject ----------
    @PostMapping("/{propertyId}/reject")
    public ResponseEntity<PropertyVerificationDto> reject(
            @AuthenticationPrincipal UserDetails userDetails ,
            @PathVariable Long propertyId,
            @RequestParam String notes
    ) {
        return ResponseEntity.ok(verificationService.rejectProperty(userDetails,propertyId, notes));
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return landlordVerificationService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/landlords/verifications")
    public List<LandlordVerificationDto> getAllLandlords(){
        return landlordVerificationService.getAll();
    }

    @GetMapping("/landlords/verifications/{id}/document")
    public ResponseEntity<Resource> getLandlordVerificationDocument(@PathVariable Long id) throws IOException {
        var document = landlordVerificationService.getDocument(id);
        return ResponseEntity.ok()
                .contentType(document.mediaType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"verification-document\"")
                .header("X-Content-Type-Options", "nosniff")
                .cacheControl(CacheControl.noStore())
                .body(document.resource());
    }

    @GetMapping("/properties/{propertyId}/verification-document")
    public ResponseEntity<Resource> getPropertyVerificationDocument(@PathVariable Long propertyId) throws IOException {
        var document = verificationService.getDocument(propertyId);
        return ResponseEntity.ok()
                .contentType(document.mediaType())
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"verification-document\"")
                .header("X-Content-Type-Options", "nosniff")
                .cacheControl(CacheControl.noStore())
                .body(document.resource());
    }
}
