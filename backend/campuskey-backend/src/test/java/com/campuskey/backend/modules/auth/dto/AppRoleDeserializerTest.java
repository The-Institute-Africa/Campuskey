package com.campuskey.backend.modules.auth.dto;

import com.campuskey.backend.entities.enumerations.AppRole;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class AppRoleDeserializerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void shouldDeserializeShorthandStudentRole() throws Exception {
        String json = """
                {
                  "username": "john",
                  "email": "john@example.com",
                  "password": "secret123",
                  "role": "student"
                }
                """;

        AuthSignupRequest request = objectMapper.readValue(json, AuthSignupRequest.class);

        assertEquals(AppRole.ROLE_STUDENT, request.getRole());
    }

    @Test
    void shouldDeserializePrefixedRoleName() throws Exception {
        String json = """
                {
                  "username": "john",
                  "email": "john@example.com",
                  "password": "secret123",
                  "role": "ROLE_ADMIN"
                }
                """;

        AuthSignupRequest request = objectMapper.readValue(json, AuthSignupRequest.class);

        assertEquals(AppRole.ROLE_ADMIN, request.getRole());
    }

    @Test
    void shouldTreatEmptyRoleArrayAsNull() throws Exception {
        String json = """
                {
                  "username": "john",
                  "email": "john@example.com",
                  "password": "secret123",
                  "role": []
                }
                """;

        AuthSignupRequest request = objectMapper.readValue(json, AuthSignupRequest.class);

        assertNull(request.getRole());
    }
}

