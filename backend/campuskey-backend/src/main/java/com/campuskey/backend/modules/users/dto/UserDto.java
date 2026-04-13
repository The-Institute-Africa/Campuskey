package com.campuskey.backend.modules.users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UserDto(
        @NotNull Long userId,
        @NotBlank @Size(max = 100) String userName,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank String role,
        boolean twoFactorEnabled,
        @Size(max = 50) String signUpMethod
) {
}

