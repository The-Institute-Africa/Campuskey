package com.campuskey.backend.modules.users.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateSignUpMethodRequest(
        @NotBlank
        @Size(max = 50)
        String signUpMethod
) {
}

