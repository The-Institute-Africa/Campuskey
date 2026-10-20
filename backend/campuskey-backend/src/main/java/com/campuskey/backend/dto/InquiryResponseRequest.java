package com.campuskey.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InquiryResponseRequest(
        @NotBlank @Size(max = 2000) String response
) {
}
