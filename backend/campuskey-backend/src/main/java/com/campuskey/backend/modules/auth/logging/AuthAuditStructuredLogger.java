package com.campuskey.backend.modules.auth.logging;

import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthAuditStructuredLogger {

    private static final Logger log = LoggerFactory.getLogger(AuthAuditStructuredLogger.class);

    public void log(AuthAuditEventType eventType, String username, boolean success, String reason) {
        if (success) {
            log.info("auth_audit event={} username={} success={} reason={}", eventType, username, true, reason);
            return;
        }
        log.warn("auth_audit event={} username={} success={} reason={}", eventType, username, false, reason);
    }
}

