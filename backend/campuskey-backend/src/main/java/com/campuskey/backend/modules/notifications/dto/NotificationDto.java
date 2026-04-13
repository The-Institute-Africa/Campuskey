package com.campuskey.backend.modules.notifications.dto;

import com.campuskey.backend.modules.notifications.entity.Notification.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record NotificationDto(
        Long notificationId,
        @NotBlank @Size(max = 100) String recipientUsername,
        @NotBlank @Size(max = 150) String title,
        @NotBlank @Size(max = 500) String message,
        @NotNull NotificationType notificationType,
        boolean read,
        Instant createdAt,
        Instant readAt
) {
}

