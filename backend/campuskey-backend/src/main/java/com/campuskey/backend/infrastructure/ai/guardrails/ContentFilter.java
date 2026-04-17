package com.campuskey.backend.infrastructure.ai.guardrails;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;

@Component
public class ContentFilter {

    private static final List<String> BLOCKED_KEYWORDS = List.of(
            "credit card",
            "password",
            "social security",
            "exploit"
    );

    public boolean isAllowed(String content) {
        if (content == null || content.isBlank()) {
            return false;
        }

        String normalizedContent = content.toLowerCase(Locale.ROOT);
        return BLOCKED_KEYWORDS.stream().noneMatch(normalizedContent::contains);
    }
}

