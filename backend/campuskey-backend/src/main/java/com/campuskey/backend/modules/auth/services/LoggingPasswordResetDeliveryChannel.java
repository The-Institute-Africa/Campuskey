package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.users.entity.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoggingPasswordResetDeliveryChannel implements PasswordResetDeliveryChannel {

    private static final Logger log = LoggerFactory.getLogger(LoggingPasswordResetDeliveryChannel.class);
    private final PasswordResetLinkFactory linkFactory;

    @Override
    public void deliverResetToken(User user, String rawToken, int validityMinutes) {
        String resetLink = linkFactory.buildLink(rawToken);
        // Placeholder delivery channel until real email/SMS integration is wired.
        log.info("Password reset token issued for userId={} username={} expiresInMinutes={}",
                user.getUserId(), user.getUserName(), validityMinutes);
        log.debug("Password reset link (debug only): {}", resetLink);
    }
}

