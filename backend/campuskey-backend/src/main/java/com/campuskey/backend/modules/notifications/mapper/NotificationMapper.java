package com.campuskey.backend.modules.notifications.mapper;

import com.campuskey.backend.modules.notifications.dto.NotificationDto;
import com.campuskey.backend.modules.emails.dto.EmailRequestDto;
import com.campuskey.backend.modules.notifications.entity.Notification;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {

    public NotificationDto toDto(Notification notification) {
        return new NotificationDto(
                notification.getNotificationId(),
                notification.getRecipientUsername(),
                notification.getTitle(),
                notification.getMessage(),
                notification.getNotificationType(),
                notification.isRead(),
                notification.getCreatedAt(),
                notification.getReadAt()
        );
    }

    public Notification fromCreateRequest(NotificationDto request) {
        Notification notification = new Notification();
        notification.setRecipientUsername(request.recipientUsername().trim());
        notification.setTitle(request.title().trim());
        notification.setMessage(request.message().trim());
        notification.setNotificationType(request.notificationType());
        return notification;
    }

    public EmailRequestDto toEmailRequest(Notification notification, String recipientEmail) {
        String source = "notifications:" + notification.getNotificationId();
        return new EmailRequestDto(
                recipientEmail,
                notification.getTitle(),
                notification.getMessage(),
                source
        );
    }
}

