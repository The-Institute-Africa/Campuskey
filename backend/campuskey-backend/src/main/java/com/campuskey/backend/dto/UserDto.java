package com.campuskey.backend.dto;
import com.campuskey.backend.entities.Role;
// lombok annotations removed; manual constructors may be added if needed

import java.time.LocalDate;
import java.time.LocalDateTime;


// @Data, @NoArgsConstructor, @AllArgsConstructor removed
public class UserDTO {
    public UserDTO() {}
    public UserDTO(Long userId, String userName, String email, boolean accountNonLocked, boolean accountNonExpired, boolean credentialsNonExpired, boolean enabled, LocalDate credentialsExpiryDate, LocalDate accountExpiryDate, String twoFactorSecret, boolean isTwoFactorEnabled, String signUpMethod, Role role, LocalDateTime createdDate, LocalDateTime updatedDate) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.accountNonLocked = accountNonLocked;
        this.accountNonExpired = accountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.enabled = enabled;
        this.credentialsExpiryDate = credentialsExpiryDate;
        this.accountExpiryDate = accountExpiryDate;
        this.twoFactorSecret = twoFactorSecret;
        this.isTwoFactorEnabled = isTwoFactorEnabled;
        this.signUpMethod = signUpMethod;
        this.role = role;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
    private Long userId;
    private String userName;
    private String email;
    private boolean accountNonLocked;
    private boolean accountNonExpired;
    private boolean credentialsNonExpired;
    private boolean enabled;
    private LocalDate credentialsExpiryDate;
    private LocalDate accountExpiryDate;
    private String twoFactorSecret;
    private boolean isTwoFactorEnabled;
    private String signUpMethod;
    private Role role;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
