package com.campuskey.backend.modules.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "campuskey.auth.password-reset")
public class PasswordResetSecurityProperties {

    private int tokenTtlMinutes = 15;
    private int cleanupCronMinutes = 30;
    private String frontendResetPath = "http://localhost:5173/reset-password";

    public int getTokenTtlMinutes() {
        return tokenTtlMinutes;
    }

    public void setTokenTtlMinutes(int tokenTtlMinutes) {
        this.tokenTtlMinutes = tokenTtlMinutes;
    }

    public int getCleanupCronMinutes() {
        return cleanupCronMinutes;
    }

    public void setCleanupCronMinutes(int cleanupCronMinutes) {
        this.cleanupCronMinutes = cleanupCronMinutes;
    }

    public String getFrontendResetPath() {
        return frontendResetPath;
    }

    public void setFrontendResetPath(String frontendResetPath) {
        this.frontendResetPath = frontendResetPath;
    }
}

