package com.campuskey.backend.modules.users.mapper;

import com.campuskey.backend.modules.users.entity.User;
import com.campuskey.backend.modules.users.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user) {
        return new UserDto(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getRole().getRoleName().name(),
                user.isTwoFactorEnabled(),
                user.getSignUpMethod()
        );
    }
}


