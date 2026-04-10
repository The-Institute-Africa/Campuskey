package com.campuskey.backend.modules.emails.dto;

import com.campuskey.backend.modules.emails.entity.EmailMessage.EmailStatus;

import java.time.Instant;

public record EmailResponseDto(
        Long emailId,
        String to,
        String subject,
        String sourceModule,
        EmailStatus status,
        Instant queuedAt,
        Instant sentAt
) {
}

