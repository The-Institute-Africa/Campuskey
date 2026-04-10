package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.dto.AuthAuditEventAdminDto;
import com.campuskey.backend.modules.auth.dto.AuthAuditEventFilter;
import com.campuskey.backend.modules.auth.entity.AuthAuditEvent;
import com.campuskey.backend.modules.auth.mapper.AuthAuditEventMapper;
import com.campuskey.backend.modules.auth.repository.AuthAuditEventRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthAuditQueryService {

    private static final Logger log = LoggerFactory.getLogger(AuthAuditQueryService.class);

    private final AuthAuditEventRepository authAuditEventRepository;
    private final AuthAuditEventMapper authAuditEventMapper;

    @Transactional(readOnly = true)
    public Page<AuthAuditEventAdminDto> findAuditEvents(AuthAuditEventFilter filter, Pageable pageable) {
        log.info("Admin auth audit query requested page={} size={}",
                pageable.getPageNumber(), pageable.getPageSize());

        Specification<AuthAuditEvent> specification = Specification.where(null);
        if (filter.getEventType() != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("eventType"), filter.getEventType()));
        }
        if (filter.getUsername() != null && !filter.getUsername().isBlank()) {
            specification = specification.and((root, query, cb) ->
                    cb.like(cb.lower(root.get("username")), "%" + filter.getUsername().trim().toLowerCase() + "%"));
        }
        if (filter.getSuccessful() != null) {
            specification = specification.and((root, query, cb) -> cb.equal(root.get("successful"), filter.getSuccessful()));
        }
        if (filter.getFrom() != null) {
            specification = specification.and((root, query, cb) -> cb.greaterThanOrEqualTo(root.get("createdAt"), filter.getFrom()));
        }
        if (filter.getTo() != null) {
            specification = specification.and((root, query, cb) -> cb.lessThanOrEqualTo(root.get("createdAt"), filter.getTo()));
        }

        return authAuditEventRepository.findAll(specification, pageable).map(authAuditEventMapper::toAdminDto);
    }
}

