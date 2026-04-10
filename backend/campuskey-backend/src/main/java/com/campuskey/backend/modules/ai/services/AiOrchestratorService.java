package com.campuskey.backend.modules.ai.services;

import com.campuskey.backend.infrastructure.ai.guardrails.ContentFilter;
import com.campuskey.backend.infrastructure.ai.guardrails.RateLimiter;
import com.campuskey.backend.infrastructure.ai.guardrails.TocenBudgetManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiOrchestratorService {

    private static final int MAX_REQUESTS_PER_MINUTE = 30;
    private static final int FALLBACK_COOLDOWN_SECONDS = 30;

    private final RateLimiter rateLimiter;
    private final TocenBudgetManager tokenBudgetManager;
    private final ContentFilter contentFilter;

    private final Map<String, Instant> circuitOpenUntilByUser = new ConcurrentHashMap<>();

    @Transactional(readOnly = true)
    public String orchestrate(String userKey,
                              String prompt,
                              int requestedTokens,
                              Supplier<String> providerCall) {
        log.info("AI orchestrator entry for user: {}", userKey);

        if (userKey == null || userKey.isBlank()) {
            log.error("AI orchestrator rejected request due to missing user key");
            return fallbackResponse();
        }
        if (!contentFilter.isAllowed(prompt)) {
            log.error("AI orchestrator blocked content for user: {}", userKey);
            return "Your request cannot be processed due to content policy.";
        }
        if (!rateLimiter.allowRequest(userKey, MAX_REQUESTS_PER_MINUTE, 60)) {
            log.error("AI orchestrator rate limited user: {}", userKey);
            return "Too many requests. Please try again later.";
        }
        if (!tokenBudgetManager.consumeTokens(userKey, requestedTokens)) {
            log.error("AI orchestrator token budget exceeded for user: {}", userKey);
            return "Token budget exceeded for this request.";
        }

        Instant circuitUntil = circuitOpenUntilByUser.get(userKey);
        if (circuitUntil != null && Instant.now().isBefore(circuitUntil)) {
            log.error("AI circuit breaker open for user: {}", userKey);
            return fallbackResponse();
        }

        try {
            String response = providerCall.get();
            log.info("AI provider call successful for user: {}", userKey);
            return (response == null || response.isBlank()) ? fallbackResponse() : response;
        } catch (Exception ex) {
            log.error("AI provider call failed for user: {}", userKey, ex);
            circuitOpenUntilByUser.put(userKey, Instant.now().plusSeconds(FALLBACK_COOLDOWN_SECONDS));
            return fallbackResponse();
        }
    }

    private String fallbackResponse() {
        return "CampusKey AI is temporarily unavailable. Please try again shortly.";
    }
}

