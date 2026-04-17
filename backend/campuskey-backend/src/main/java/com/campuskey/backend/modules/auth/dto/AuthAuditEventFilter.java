package com.campuskey.backend.modules.auth.dto;

import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.Instant;

public class AuthAuditEventFilter {

    private AuthAuditEventType eventType;
    private String username;
    private Boolean successful;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Instant from;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Instant to;

    public AuthAuditEventType getEventType() {
        return eventType;
    }

    public void setEventType(AuthAuditEventType eventType) {
        this.eventType = eventType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getSuccessful() {
        return successful;
    }

    public void setSuccessful(Boolean successful) {
        this.successful = successful;
    }

    public Instant getFrom() {
        return from;
    }

    public void setFrom(Instant from) {
        this.from = from;
    }

    public Instant getTo() {
        return to;
    }

    public void setTo(Instant to) {
        this.to = to;
    }
}

