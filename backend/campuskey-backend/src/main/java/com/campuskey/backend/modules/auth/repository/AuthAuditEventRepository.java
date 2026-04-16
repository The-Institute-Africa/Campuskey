package com.campuskey.backend.modules.auth.repository;

import com.campuskey.backend.modules.auth.entity.AuthAuditEvent;
import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.Instant;
import java.util.List;

public interface AuthAuditEventRepository extends JpaRepository<AuthAuditEvent, Long>,
        JpaSpecificationExecutor<AuthAuditEvent> {

    List<AuthAuditEvent> findTop50ByUsernameOrderByCreatedAtDesc(String username);

    long countByEventTypeAndCreatedAtAfter(AuthAuditEventType eventType, Instant from);
}

