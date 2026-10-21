package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.ProfileDto;
import com.campuskey.backend.entities.enumerations.AccountState;
import com.campuskey.backend.services.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/campuskey")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile/me")
    public ProfileDto myProfile(@AuthenticationPrincipal UserDetails user) {
        return profileService.mine(user.getUsername());
    }

    @PutMapping("/profile/me")
    public ProfileDto updateMyProfile(@AuthenticationPrincipal UserDetails user, @RequestBody ProfileDto request) {
        return profileService.updateMine(user.getUsername(), request);
    }

    @GetMapping("/profile/landlords/{id}")
    public ProfileDto landlordProfile(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return profileService.landlordForStudent(user.getUsername(), id);
    }

    @GetMapping("/profile/students/{id}")
    public ProfileDto studentProfile(@AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return profileService.studentForLandlord(user.getUsername(), id);
    }

    @PostMapping("/account/suspend")
    public ResponseEntity<Void> suspend(@AuthenticationPrincipal UserDetails user) {
        profileService.changeState(user.getUsername(), AccountState.SUSPENDED);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/account/reactivate")
    public ResponseEntity<Void> reactivate(@AuthenticationPrincipal UserDetails user) {
        profileService.changeState(user.getUsername(), AccountState.ACTIVE);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/account/delete")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetails user) {
        profileService.changeState(user.getUsername(), AccountState.DELETED);
        return ResponseEntity.noContent().build();
    }
}
