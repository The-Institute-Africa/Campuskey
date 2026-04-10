package com.campuskey.backend.modules.emails.services;

import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.modules.emails.dto.EmailRequestDto;
import com.campuskey.backend.modules.emails.dto.EmailResponseDto;
import com.campuskey.backend.modules.emails.entity.EmailMessage;
import com.campuskey.backend.modules.emails.mapper.EmailMapper;
import com.campuskey.backend.modules.emails.repository.EmailMessageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final EmailMessageRepository emailMessageRepository;
    private final EmailMapper emailMapper;

    @Transactional
    public EmailResponseDto queueEmail(EmailRequestDto request) {
        validateRequest(request);
        log.info("Queueing email for recipient={} sourceModule={}", request.to(), request.sourceModule());

        EmailMessage message = emailMapper.fromRequest(request);
        EmailMessage saved = emailMessageRepository.save(message);

        try {
            // Delivery adapter integration will be plugged in the next batch.
            saved.markSent(Instant.now());
        } catch (RuntimeException exception) {
            saved.markFailed("delivery_adapter_unavailable");
            log.error("Email delivery failed for emailId={}", saved.getEmailId(), exception);
        }

        saved = emailMessageRepository.save(saved);
        return emailMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public Page<EmailResponseDto> listByRecipient(String recipient, Pageable pageable) {
        if (recipient == null || recipient.isBlank()) {
            throw new BadRequestException("recipient is required.");
        }
        return emailMessageRepository
                .findByRecipientIgnoreCaseOrderByQueuedAtDesc(recipient.trim(), pageable)
                .map(emailMapper::toResponse);
    }

    private void validateRequest(EmailRequestDto request) {
        if (request == null) {
            throw new BadRequestException("Email request is required.");
        }
        if (request.to() == null || request.to().isBlank()) {
            throw new BadRequestException("to is required.");
        }
        if (request.subject() == null || request.subject().isBlank()) {
            throw new BadRequestException("subject is required.");
        }
        if (request.body() == null || request.body().isBlank()) {
            throw new BadRequestException("body is required.");
        }
        if (request.sourceModule() == null || request.sourceModule().isBlank()) {
            throw new BadRequestException("sourceModule is required.");
        }
    }
}

