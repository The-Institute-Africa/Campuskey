package com.campuskey.backend.modules.ai.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChatRequest(
        @NotBlank String userKey,
        @NotBlank @Size(max = 4000) String prompt,
        @NotNull @Min(1) @Max(2000) Integer maxTokens
) {
}

