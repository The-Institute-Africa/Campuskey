package com.campuskey.backend.modules.emails.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EmailRequestDto(
        @NotBlank @Email @Size(max = 150) String to,
        @NotBlank @Size(max = 200) String subject,
        @NotBlank @Size(max = 5000) String body,
        @NotBlank @Size(max = 50) String sourceModule
) {
}

