package com.campuskey.backend.modules.notifications.controller;

import com.campuskey.backend.modules.notifications.dto.NotificationDto;
import com.campuskey.backend.modules.notifications.services.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/campuskey/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public Page<NotificationDto> listMyNotifications(Authentication authentication, Pageable pageable) {
        return notificationService.listCurrentUserNotifications(authentication, pageable);
    }

    @GetMapping("/unread-count")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public long unreadCount(Authentication authentication) {
        return notificationService.countUnread(authentication);
    }

    @PatchMapping("/{notificationId}/read")
    @PreAuthorize("hasAnyRole('ADMIN', 'STUDENT', 'LANDLORD')")
    public NotificationDto markRead(@PathVariable Long notificationId, Authentication authentication) {
        return notificationService.markRead(notificationId, authentication);
    }

    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public NotificationDto createForRecipient(@Valid @RequestBody NotificationDto request) {
        return notificationService.createNotification(request);
    }
}

