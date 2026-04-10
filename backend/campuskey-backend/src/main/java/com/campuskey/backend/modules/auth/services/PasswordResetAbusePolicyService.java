package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.config.PasswordResetSecurityProperties;
import com.campuskey.backend.modules.auth.entity.PasswordResetToken;
import com.campuskey.backend.modules.auth.repository.PasswordResetTokenRepository;
import com.campuskey.backend.modules.users.entity.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class PasswordResetAbusePolicyService {

    private static final Logger log = LoggerFactory.getLogger(PasswordResetAbusePolicyService.class);

    private final PasswordResetSecurityProperties securityProperties;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    public boolean canIssueResetToken(User user, Instant now) {
        long userId = user.getUserId();

        Instant windowStart = now.minus(securityProperties.getWindowMinutes(), ChronoUnit.MINUTES);
        long requestsInWindow = passwordResetTokenRepository.countByUserUserIdAndCreatedAtAfter(userId, windowStart);
        if (requestsInWindow >= securityProperties.getMaxRequestsPerWindow()) {
            log.warn("Password reset denied by window policy userId={} requestsInWindow={}", userId, requestsInWindow);
            return false;
        }

        long activeTokens = passwordResetTokenRepository.countByUserUserIdAndUsedAtIsNullAndExpiresAtAfter(userId, now);
        if (activeTokens >= securityProperties.getMaxActiveTokens()) {
            log.warn("Password reset denied by active-token policy userId={} activeTokens={}", userId, activeTokens);
            return false;
        }

        PasswordResetToken latestToken = passwordResetTokenRepository.findTopByUserUserIdOrderByCreatedAtDesc(userId)
                .orElse(null);
        if (latestToken != null) {
            Instant allowedAt = latestToken.getCreatedAt().plusSeconds(securityProperties.getCooldownSeconds());
            if (now.isBefore(allowedAt)) {
                log.warn("Password reset denied by cooldown policy userId={} nextAllowedAt={}", userId, allowedAt);
                return false;
            }
        }

        return true;
    }
}

