package com.campuskey.backend.modules.auth.dto;

import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;

import java.time.Instant;

public record AuthAuditEventAdminDto(
        Long id,
        AuthAuditEventType eventType,
        String username,
        boolean successful,
        String reason,
        Instant createdAt
) {
}

