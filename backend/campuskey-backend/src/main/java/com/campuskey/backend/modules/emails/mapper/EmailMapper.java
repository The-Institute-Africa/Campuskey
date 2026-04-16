package com.campuskey.backend.modules.emails.mapper;

import com.campuskey.backend.modules.emails.dto.EmailRequestDto;
import com.campuskey.backend.modules.emails.dto.EmailResponseDto;
import com.campuskey.backend.modules.emails.entity.EmailMessage;
import org.springframework.stereotype.Component;

@Component
public class EmailMapper {

    public EmailMessage fromRequest(EmailRequestDto request) {
        EmailMessage message = new EmailMessage();
        message.setRecipient(request.to().trim());
        message.setSubject(request.subject().trim());
        message.setBody(request.body().trim());
        message.setSourceModule(request.sourceModule().trim());
        return message;
    }

    public EmailResponseDto toResponse(EmailMessage message) {
        return new EmailResponseDto(
                message.getEmailId(),
                message.getRecipient(),
                message.getSubject(),
                message.getSourceModule(),
                message.getStatus(),
                message.getQueuedAt(),
                message.getSentAt()
        );
    }
}

