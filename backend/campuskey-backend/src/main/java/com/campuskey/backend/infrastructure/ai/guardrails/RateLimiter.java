package com.campuskey.backend.infrastructure.ai.guardrails;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimiter {

    private final Map<String, Deque<Instant>> requestTimesByKey = new ConcurrentHashMap<>();

    public boolean allowRequest(String key, int maxRequests, long windowSeconds) {
        Deque<Instant> timestamps = requestTimesByKey.computeIfAbsent(key, ignored -> new ArrayDeque<>());
        Instant now = Instant.now();
        Instant windowStart = now.minusSeconds(windowSeconds);

        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(windowStart)) {
                timestamps.removeFirst();
            }
            if (timestamps.size() >= maxRequests) {
                return false;
            }
            timestamps.addLast(now);
            return true;
        }
    }
}

