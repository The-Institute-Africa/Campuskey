package com.campuskey.backend.modules.users.services;

import com.campuskey.backend.modules.users.entity.User;
import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.exceptions.ForbiddenException;
import com.campuskey.backend.exceptions.ResourceNotFoundException;
import com.campuskey.backend.modules.users.dto.UserDto;
import com.campuskey.backend.modules.users.mapper.UserMapper;
import com.campuskey.backend.modules.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Transactional(readOnly = true)
    public Page<UserDto> listUsers(Pageable pageable) {
        log.info("Listing users page: {} size: {}", pageable.getPageNumber(), pageable.getPageSize());
        return userRepository.findAll(pageable).map(userMapper::toDto);
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(Long userId) {
        log.info("Fetching user by id: {}", userId);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDto updateSignUpMethod(Long userId, String signUpMethod, Authentication authentication) {
        log.info("Updating sign up method for user: {}", userId);
        validateSignUpMethod(signUpMethod);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + userId));

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
        boolean isOwner = user.getUserName().equals(authentication.getName());

        if (!isAdmin && !isOwner) {
            log.error("Unauthorized sign up method update attempt for userId: {} by principal: {}", userId, authentication.getName());
            throw new ForbiddenException("You do not have permission to modify this user.");
        }

        user.setSignUpMethod(signUpMethod.trim());
        User savedUser = userRepository.save(user);
        log.info("Updated sign up method for user: {}", userId);

        return userMapper.toDto(savedUser);
    }

    private void validateSignUpMethod(String signUpMethod) {
        if (signUpMethod == null || signUpMethod.isBlank()) {
            throw new BadRequestException("signUpMethod is required.");
        }
        if (signUpMethod.length() > 50) {
            throw new BadRequestException("signUpMethod must not exceed 50 characters.");
        }
    }
}


