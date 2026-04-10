package com.campuskey.backend.modules.auth.repository;

import com.campuskey.backend.modules.auth.entity.AuthAuditEvent;
import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface AuthAuditEventRepository extends JpaRepository<AuthAuditEvent, Long> {

    List<AuthAuditEvent> findTop50ByUsernameOrderByCreatedAtDesc(String username);

    long countByEventTypeAndCreatedAtAfter(AuthAuditEventType eventType, Instant from);
}

