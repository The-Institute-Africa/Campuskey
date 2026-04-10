package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.config.PasswordResetSecurityProperties;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class PasswordResetTokenCleanupScheduler {

    private static final Logger log = LoggerFactory.getLogger(PasswordResetTokenCleanupScheduler.class);

    private final PasswordResetSecurityProperties securityProperties;
    private final PasswordResetTokenMaintenanceService maintenanceService;

    @Scheduled(cron = "0 */${campuskey.auth.password-reset.cleanup-cron-minutes:30} * * * *")
    public void cleanupExpiredAndUsedTokens() {
        maintenanceService.cleanupStaleTokens(Instant.now());
        log.info("Password reset token cleanup scheduler completed intervalMinutes={}",
                securityProperties.getCleanupCronMinutes());
    }
}

