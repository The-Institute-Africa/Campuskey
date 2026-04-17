package com.campuskey.backend.modules.auth.dto;

import java.util.List;

public class AuthResponse {

    private String jwtToken;
    private String username;
    private List<String> roles;
    private boolean accountNonLocked;
    private boolean accountNonExpired;
    private boolean credentialsNonExpired;
    private boolean enabled;

    public AuthResponse(String jwtToken,
                        String username,
                        List<String> roles,
                        boolean accountNonLocked,
                        boolean accountNonExpired,
                        boolean credentialsNonExpired,
                        boolean enabled) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.roles = roles;
        this.accountNonLocked = accountNonLocked;
        this.accountNonExpired = accountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }

    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }

    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public boolean isEnabled() {
        return enabled;
    }
}

