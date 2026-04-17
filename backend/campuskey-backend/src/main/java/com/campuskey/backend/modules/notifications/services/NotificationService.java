package com.campuskey.backend.modules.notifications.services;

import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.exceptions.ForbiddenException;
import com.campuskey.backend.exceptions.ResourceNotFoundException;
import com.campuskey.backend.modules.emails.dto.EmailRequestDto;
import com.campuskey.backend.modules.emails.services.EmailService;
import com.campuskey.backend.modules.notifications.dto.NotificationDto;
import com.campuskey.backend.modules.notifications.entity.Notification;
import com.campuskey.backend.modules.notifications.mapper.NotificationMapper;
import com.campuskey.backend.modules.notifications.repository.NotificationRepository;
import com.campuskey.backend.modules.users.entity.User;
import com.campuskey.backend.modules.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Transactional(readOnly = true)
    public Page<NotificationDto> listCurrentUserNotifications(Authentication authentication, Pageable pageable) {
        String username = authentication.getName();
        log.info("Listing notifications for username={} page={} size={}",
                username, pageable.getPageNumber(), pageable.getPageSize());
        return notificationRepository
                .findByRecipientUsernameIgnoreCaseOrderByCreatedAtDesc(username, pageable)
                .map(notificationMapper::toDto);
    }

    @Transactional
    public NotificationDto createNotification(NotificationDto request) {
        log.info("Creating notification for recipient={}", request.recipientUsername());
        validateCreateRequest(request);

        Notification notification = notificationMapper.fromCreateRequest(request);
        Notification saved = notificationRepository.save(notification);
        queueEmailForNotification(saved);
        return notificationMapper.toDto(saved);
    }

    private void queueEmailForNotification(Notification notification) {
        userRepository.findByUserNameIgnoreCase(notification.getRecipientUsername())
                .map(User::getEmail)
                .filter(email -> email != null && !email.isBlank())
                .ifPresentOrElse(email -> {
                    EmailRequestDto emailRequest = notificationMapper.toEmailRequest(notification, email);
                    emailService.queueNotificationEmail(emailRequest);
                }, () -> log.warn("No email address found for notification recipient={}",
                        notification.getRecipientUsername()));
    }

    @Transactional
    public NotificationDto markRead(Long notificationId, Authentication authentication) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found: " + notificationId));

        String username = authentication.getName();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
        boolean isOwner = notification.getRecipientUsername().equalsIgnoreCase(username);
        if (!isAdmin && !isOwner) {
            throw new ForbiddenException("You do not have permission to modify this notification.");
        }

        if (!notification.isRead()) {
            notification.markRead(Instant.now());
            notification = notificationRepository.save(notification);
            log.info("Marked notificationId={} as read by username={}", notificationId, username);
        }

        return notificationMapper.toDto(notification);
    }

    @Transactional(readOnly = true)
    public long countUnread(Authentication authentication) {
        String username = authentication.getName();
        return notificationRepository.countByRecipientUsernameIgnoreCaseAndReadAtIsNull(username);
    }

    private void validateCreateRequest(NotificationDto request) {
        if (request == null) {
            throw new BadRequestException("Notification payload is required.");
        }
        if (request.recipientUsername() == null || request.recipientUsername().isBlank()) {
            throw new BadRequestException("recipientUsername is required.");
        }
        if (request.title() == null || request.title().isBlank()) {
            throw new BadRequestException("title is required.");
        }
        if (request.message() == null || request.message().isBlank()) {
            throw new BadRequestException("message is required.");
        }
        if (request.notificationType() == null) {
            throw new BadRequestException("notificationType is required.");
        }
    }
}

