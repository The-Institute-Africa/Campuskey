package com.campuskey.backend.security.response;

import java.util.Set;

public class LoginResponse {
    private String jwtToken;

    private String username;
    private String accountStatus;


    public LoginResponse(String username, String accountStatus, String jwtToken) {
        this.username = username;
        this.accountStatus=accountStatus;
        this.jwtToken = jwtToken;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAccountStatus() {
        return accountStatus;
    }

    public void setAccountStatus(String accountStatus) {
        this.accountStatus=accountStatus;
    }
}

