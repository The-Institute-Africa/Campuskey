package com.campuskey.backend.modules.auth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "campuskey.auth.password-reset")
public class PasswordResetSecurityProperties {

    private int tokenTtlMinutes = 15;
    private int cleanupCronMinutes = 30;
    private int cooldownSeconds = 60;
    private int windowMinutes = 30;
    private int maxRequestsPerWindow = 5;
    private int maxActiveTokens = 3;
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

    public int getCooldownSeconds() {
        return cooldownSeconds;
    }

    public void setCooldownSeconds(int cooldownSeconds) {
        this.cooldownSeconds = cooldownSeconds;
    }

    public int getWindowMinutes() {
        return windowMinutes;
    }

    public void setWindowMinutes(int windowMinutes) {
        this.windowMinutes = windowMinutes;
    }

    public int getMaxRequestsPerWindow() {
        return maxRequestsPerWindow;
    }

    public void setMaxRequestsPerWindow(int maxRequestsPerWindow) {
        this.maxRequestsPerWindow = maxRequestsPerWindow;
    }

    public int getMaxActiveTokens() {
        return maxActiveTokens;
    }

    public void setMaxActiveTokens(int maxActiveTokens) {
        this.maxActiveTokens = maxActiveTokens;
    }

    public String getFrontendResetPath() {
        return frontendResetPath;
    }

    public void setFrontendResetPath(String frontendResetPath) {
        this.frontendResetPath = frontendResetPath;
    }
}

