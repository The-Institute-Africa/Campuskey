package com.campuskey.backend.modules.notifications.services;

import com.campuskey.backend.modules.emails.services.EmailService;
import com.campuskey.backend.modules.notifications.dto.NotificationDto;
import com.campuskey.backend.modules.notifications.entity.Notification;
import com.campuskey.backend.modules.notifications.entity.Notification.NotificationType;
import com.campuskey.backend.modules.notifications.mapper.NotificationMapper;
import com.campuskey.backend.modules.notifications.repository.NotificationRepository;
import com.campuskey.backend.modules.users.entity.User;
import com.campuskey.backend.modules.users.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private NotificationMapper notificationMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private NotificationService notificationService;

    @Test
    void createNotificationQueuesEmailWhenRecipientHasEmail() {
        NotificationDto request = new NotificationDto(
                null,
                "john",
                "Title",
                "Body",
                NotificationType.SYSTEM,
                false,
                null,
                null
        );

        Notification notification = new Notification();
        notification.setRecipientUsername("john");
        notification.setTitle("Title");
        notification.setMessage("Body");
        notification.setNotificationType(NotificationType.SYSTEM);

        Notification saved = notification;

        User user = new User();
        user.setUserName("john");
        user.setEmail("john@example.com");

        when(notificationMapper.fromCreateRequest(request)).thenReturn(notification);
        when(notificationRepository.save(notification)).thenReturn(saved);
        when(userRepository.findByUserNameIgnoreCase("john")).thenReturn(Optional.of(user));
        when(notificationMapper.toEmailRequest(ArgumentMatchers.eq(saved), ArgumentMatchers.eq("john@example.com")))
                .thenReturn(new com.campuskey.backend.modules.emails.dto.EmailRequestDto(
                        "john@example.com", "Title", "Body", "notifications:1"
                ));
        when(notificationMapper.toDto(saved)).thenReturn(request);

        NotificationDto result = notificationService.createNotification(request);

        verify(emailService).queueNotificationEmail(ArgumentMatchers.any());
        assertEquals("john", result.recipientUsername());
    }
}

