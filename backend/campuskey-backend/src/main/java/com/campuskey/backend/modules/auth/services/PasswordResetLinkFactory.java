package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.auth.config.PasswordResetSecurityProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class PasswordResetLinkFactory {

    private final PasswordResetSecurityProperties securityProperties;

    public String buildLink(String rawToken) {
        String basePath = securityProperties.getFrontendResetPath();
        String separator = basePath.contains("?") ? "&" : "?";
        return basePath + separator + "token=" + URLEncoder.encode(rawToken, StandardCharsets.UTF_8);
    }
}

