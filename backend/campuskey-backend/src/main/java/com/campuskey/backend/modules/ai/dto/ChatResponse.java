package com.campuskey.backend.modules.ai.dto;

public record ChatResponse(
        String response,
        boolean fallback,
        String status
) {
}

