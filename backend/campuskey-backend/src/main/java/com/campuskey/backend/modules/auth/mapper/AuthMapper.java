package com.campuskey.backend.modules.auth.mapper;

import com.campuskey.backend.modules.auth.dto.AuthResponse;
import com.campuskey.backend.modules.users.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AuthMapper {

    public AuthResponse toAuthResponse(User user, String jwtToken) {
        return new AuthResponse(
                jwtToken,
                user.getUserName(),
                List.of(user.getRole().getRoleName().name()),
                user.isAccountNonLocked(),
                user.isAccountNonExpired(),
                user.isCredentialsNonExpired(),
                user.isEnabled()
        );
    }
}

