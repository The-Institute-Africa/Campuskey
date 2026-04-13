package com.campuskey.backend.infrastructure.ai.guardrails;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TocenBudgetManager {

    private static final int DEFAULT_TOKEN_BUDGET = 10_000;
    private final Map<String, Integer> remainingBudgetByKey = new ConcurrentHashMap<>();

    public boolean consumeTokens(String key, int tokensRequested) {
        if (tokensRequested <= 0) {
            return true;
        }

        synchronized (remainingBudgetByKey) {
            int remaining = remainingBudgetByKey.getOrDefault(key, DEFAULT_TOKEN_BUDGET);
            if (tokensRequested > remaining) {
                return false;
            }
            remainingBudgetByKey.put(key, remaining - tokensRequested);
            return true;
        }
    }

    public int getRemainingBudget(String key) {
        return remainingBudgetByKey.getOrDefault(key, DEFAULT_TOKEN_BUDGET);
    }
}
