package com.campuskey.backend.modules.emails.repository;

import com.campuskey.backend.modules.emails.entity.EmailMessage;
import com.campuskey.backend.modules.emails.entity.EmailMessage.EmailStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailMessageRepository extends JpaRepository<EmailMessage, Long> {

    Page<EmailMessage> findByRecipientIgnoreCaseOrderByQueuedAtDesc(String recipient, Pageable pageable);

    Page<EmailMessage> findByStatusOrderByQueuedAtDesc(EmailStatus status, Pageable pageable);
}

