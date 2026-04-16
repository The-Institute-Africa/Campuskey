package com.campuskey.backend.modules.auth.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "auth_audit_events")
public class AuthAuditEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false, length = 50)
    private AuthAuditEventType eventType;

    @Column(name = "username", length = 100)
    private String username;

    @Column(name = "successful", nullable = false)
    private boolean successful;

    @Column(name = "reason", length = 255)
    private String reason;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    public AuthAuditEvent() {
    }

    public AuthAuditEvent(AuthAuditEventType eventType,
                          String username,
                          boolean successful,
                          String reason,
                          Instant createdAt) {
        this.eventType = eventType;
        this.username = username;
        this.successful = successful;
        this.reason = reason;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public AuthAuditEventType getEventType() {
        return eventType;
    }

    public String getUsername() {
        return username;
    }

    public boolean isSuccessful() {
        return successful;
    }

    public String getReason() {
        return reason;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}

