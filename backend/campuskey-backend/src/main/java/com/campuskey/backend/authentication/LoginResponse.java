package com.campuskey.backend.authentication;


import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class LoginResponse {
    private String token;

    private long expiresIn;

    public LoginResponse() {}

    public LoginResponse(String token, long expiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
    }
    public String getToken() {
        return token;
    }

    public long getExpiresIn() {
        return expiresIn;
    }


}
