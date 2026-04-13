package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.config.PasswordResetSecurityProperties;
import com.campuskey.backend.modules.auth.entity.PasswordResetToken;
import com.campuskey.backend.modules.auth.repository.PasswordResetTokenRepository;
import com.campuskey.backend.modules.users.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PasswordResetAbusePolicyServiceTest {

    @Mock
    private PasswordResetTokenRepository passwordResetTokenRepository;

    private PasswordResetSecurityProperties securityProperties;
    private PasswordResetAbusePolicyService service;

    @BeforeEach
    void setUp() {
        securityProperties = new PasswordResetSecurityProperties();
        securityProperties.setCooldownSeconds(60);
        securityProperties.setWindowMinutes(30);
        securityProperties.setMaxRequestsPerWindow(5);
        securityProperties.setMaxActiveTokens(3);
        service = new PasswordResetAbusePolicyService(securityProperties, passwordResetTokenRepository);
    }

    @Test
    void denyWhenWindowLimitReached() {
        User user = buildUser(10L);
        Instant now = Instant.now();

        when(passwordResetTokenRepository.countByUserUserIdAndCreatedAtAfter(eq(10L), any()))
                .thenReturn(5L);

        boolean allowed = service.canIssueResetToken(user, now);

        assertFalse(allowed);
    }

    @Test
    void denyWhenActiveTokenLimitReached() {
        User user = buildUser(11L);
        Instant now = Instant.now();

        when(passwordResetTokenRepository.countByUserUserIdAndCreatedAtAfter(eq(11L), any()))
                .thenReturn(1L);
        when(passwordResetTokenRepository.countByUserUserIdAndUsedAtIsNullAndExpiresAtAfter(11L, now))
                .thenReturn(3L);

        boolean allowed = service.canIssueResetToken(user, now);

        assertFalse(allowed);
    }

    @Test
    void allowWhenPoliciesPass() {
        User user = buildUser(12L);
        Instant now = Instant.now();

        when(passwordResetTokenRepository.countByUserUserIdAndCreatedAtAfter(eq(12L), any()))
                .thenReturn(1L);
        when(passwordResetTokenRepository.countByUserUserIdAndUsedAtIsNullAndExpiresAtAfter(12L, now))
                .thenReturn(0L);

        PasswordResetToken latest = new PasswordResetToken();
        latest.markUsed(now.minusSeconds(10));
        when(passwordResetTokenRepository.findTopByUserUserIdOrderByCreatedAtDesc(12L))
                .thenReturn(Optional.empty());

        boolean allowed = service.canIssueResetToken(user, now);

        assertTrue(allowed);
    }

    private User buildUser(Long userId) {
        User user = new User();
        try {
            java.lang.reflect.Field field = User.class.getDeclaredField("userId");
            field.setAccessible(true);
            field.set(user, userId);
        } catch (NoSuchFieldException | IllegalAccessException exception) {
            throw new IllegalStateException(exception);
        }
        return user;
    }
}

