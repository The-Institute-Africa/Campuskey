package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.services.StudentFavoriteService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campuskey/student/favorites")
public class StudentFavoriteController {

    private final StudentFavoriteService favoriteService;

    public StudentFavoriteController(StudentFavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public List<PropertyDto> list(@AuthenticationPrincipal UserDetails user) {
        return favoriteService.list(user.getUsername());
    }

    @PostMapping("/{propertyId}")
    public void add(@AuthenticationPrincipal UserDetails user, @PathVariable Long propertyId) {
        favoriteService.add(user.getUsername(), propertyId);
    }

    @DeleteMapping("/{propertyId}")
    public void remove(@AuthenticationPrincipal UserDetails user, @PathVariable Long propertyId) {
        favoriteService.remove(user.getUsername(), propertyId);
    }
}
