package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Role;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class UserDTO {
    private final Long userId;
    private final String userName;
    private final String email;
    private final boolean accountNonLocked;
    private final boolean accountNonExpired;
    private final boolean credentialsNonExpired;
    private final boolean enabled;
    private final LocalDate credentialsExpiryDate;
    private final LocalDate accountExpiryDate;
    private final boolean twoFactorEnabled;
    private final String signUpMethod;
    private final Role role;
    private final LocalDateTime createdDate;
    private final LocalDateTime updatedDate;

    public UserDTO(Long userId, String userName, String email, boolean accountNonLocked,
                   boolean accountNonExpired, boolean credentialsNonExpired, boolean enabled,
                   LocalDate credentialsExpiryDate, LocalDate accountExpiryDate,
                   boolean twoFactorEnabled, String signUpMethod, Role role,
                   LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.accountNonLocked = accountNonLocked;
        this.accountNonExpired = accountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.credentialsExpiryDate = credentialsExpiryDate;
        this.accountExpiryDate = accountExpiryDate;
        this.twoFactorEnabled = twoFactorEnabled;
        this.signUpMethod = signUpMethod;
        this.role = role;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getEmail() {
        return email;
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

    public LocalDate getCredentialsExpiryDate() {
        return credentialsExpiryDate;
    }

    public LocalDate getAccountExpiryDate() {
        return accountExpiryDate;
    }

    public boolean isTwoFactorEnabled() {
        return twoFactorEnabled;
    }

    public String getSignUpMethod() {
        return signUpMethod;
    }

    public Role getRole() {
        return role;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }
}
