package com.campuskey.backend.modules.users.controller;

import com.campuskey.backend.modules.users.dto.UpdateSignUpMethodRequest;
import com.campuskey.backend.modules.users.dto.UserDto;
import com.campuskey.backend.modules.users.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/campuskey/admin/users")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserDto> listUsers(Pageable pageable) {
        return userService.listUsers(pageable);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public UserDto getUser(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PatchMapping("/{userId}/signup-method")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public UserDto updateSignUpMethod(@PathVariable Long userId,
                                      @Valid @RequestBody UpdateSignUpMethodRequest request,
                                      Authentication authentication) {
        return userService.updateSignUpMethod(userId, request.signUpMethod(), authentication);
    }
}

