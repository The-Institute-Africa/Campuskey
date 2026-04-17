package com.campuskey.backend.modules.auth.dto;

import com.campuskey.backend.entities.enumerations.AppRole;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;

public class AppRoleDeserializer extends JsonDeserializer<AppRole> {

    @Override
    public AppRole deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        JsonToken token = parser.currentToken();

        if (token == JsonToken.VALUE_NULL) {
            return null;
        }

        if (token == JsonToken.START_ARRAY) {
            JsonToken nextToken = parser.nextToken();
            if (nextToken == JsonToken.END_ARRAY) {
                return null;
            }

            String value = parser.getValueAsString();
            consumeRemainingArray(parser);
            return parseRole(value, context);
        }

        if (token == JsonToken.VALUE_STRING) {
            return parseRole(parser.getValueAsString(), context);
        }

        return (AppRole) context.handleUnexpectedToken(AppRole.class, parser);
    }

    private AppRole parseRole(String rawValue, DeserializationContext context) throws IOException {
        if (rawValue == null || rawValue.isBlank()) {
            return null;
        }

        String normalizedValue = normalizeRoleValue(rawValue);
        try {
            return AppRole.valueOf(normalizedValue);
        } catch (IllegalArgumentException ex) {
            return (AppRole) context.handleWeirdStringValue(AppRole.class, rawValue,
                    "Role must be one of student, landlord, admin, ROLE_STUDENT, ROLE_LANDLORD, ROLE_ADMIN.");
        }
    }

    private String normalizeRoleValue(String rawValue) {
        String value = rawValue.trim().toUpperCase();
        return switch (value) {
            case "STUDENT", "ROLE_STUDENT" -> AppRole.ROLE_STUDENT.name();
            case "LANDLORD", "ROLE_LANDLORD" -> AppRole.ROLE_LANDLORD.name();
            case "ADMIN", "ROLE_ADMIN" -> AppRole.ROLE_ADMIN.name();
            default -> value;
        };
    }

    private void consumeRemainingArray(JsonParser parser) throws IOException {
        while (parser.currentToken() != JsonToken.END_ARRAY) {
            parser.nextToken();
            parser.skipChildren();
        }
    }
}

