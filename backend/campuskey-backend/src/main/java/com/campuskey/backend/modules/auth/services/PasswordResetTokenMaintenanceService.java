package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.repository.PasswordResetTokenRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenMaintenanceService {

    private static final Logger log = LoggerFactory.getLogger(PasswordResetTokenMaintenanceService.class);

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Transactional
    public void cleanupStaleTokens(Instant now) {
        long expiredDeleted = passwordResetTokenRepository.deleteByExpiresAtBefore(now);
        long usedDeleted = passwordResetTokenRepository.deleteByUsedAtIsNotNull();
        log.info("Password reset token cleanup completed expiredDeleted={} usedDeleted={}", expiredDeleted, usedDeleted);
    }

    @Transactional
    public void revokeTokensForUser(Long userId) {
        long deleted = passwordResetTokenRepository.deleteByUserUserId(userId);
        log.info("Password reset tokens revoked for userId={} deleted={}", userId, deleted);
    }
}

