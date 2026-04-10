package com.campuskey.backend.exceptions;

import java.time.Instant;

public record ApiErrorResponse(
        String message,
        String code,
        Instant timestamp,
        String path
) {
}

