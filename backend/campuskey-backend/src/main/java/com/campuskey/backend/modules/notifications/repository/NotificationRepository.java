package com.campuskey.backend.modules.notifications.repository;

import com.campuskey.backend.modules.notifications.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findByRecipientUsernameIgnoreCaseOrderByCreatedAtDesc(String recipientUsername, Pageable pageable);

    long countByRecipientUsernameIgnoreCaseAndReadAtIsNull(String recipientUsername);
}

