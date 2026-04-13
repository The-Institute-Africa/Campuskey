package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.entity.AuthAuditEvent;
import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;
import com.campuskey.backend.modules.auth.logging.AuthAuditStructuredLogger;
import com.campuskey.backend.modules.auth.repository.AuthAuditEventRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthAuditEventService {

    private static final Logger log = LoggerFactory.getLogger(AuthAuditEventService.class);

    private final AuthAuditEventRepository authAuditEventRepository;
    private final AuthAuditStructuredLogger structuredLogger;

    @Transactional
    public void record(AuthAuditEventType eventType, String username, boolean success, String reason) {
        structuredLogger.log(eventType, username, success, reason);
        try {
            AuthAuditEvent event = new AuthAuditEvent(eventType, username, success, reason, Instant.now());
            authAuditEventRepository.save(event);
        } catch (RuntimeException exception) {
            // Audit persistence must not block auth flow.
            log.error("Failed to persist auth audit event type={} username={}", eventType, username, exception);
        }
    }
}

