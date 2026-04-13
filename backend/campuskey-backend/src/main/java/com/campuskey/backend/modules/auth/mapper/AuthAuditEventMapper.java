package com.campuskey.backend.modules.auth.mapper;

import com.campuskey.backend.modules.auth.dto.AuthAuditEventAdminDto;
import com.campuskey.backend.modules.auth.entity.AuthAuditEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthAuditEventMapper {

    public AuthAuditEventAdminDto toAdminDto(AuthAuditEvent event) {
        return new AuthAuditEventAdminDto(
                event.getId(),
                event.getEventType(),
                event.getUsername(),
                event.isSuccessful(),
                event.getReason(),
                event.getCreatedAt()
        );
    }
}

