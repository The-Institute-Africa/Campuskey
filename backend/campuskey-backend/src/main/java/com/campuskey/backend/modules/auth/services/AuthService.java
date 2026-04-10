package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.exceptions.ForbiddenException;
import com.campuskey.backend.exceptions.ResourceNotFoundException;
import com.campuskey.backend.modules.auth.dto.AuthLoginRequest;
import com.campuskey.backend.modules.auth.dto.AuthResponse;
import com.campuskey.backend.modules.auth.dto.AuthSignupRequest;
import com.campuskey.backend.modules.auth.mapper.AuthMapper;
import com.campuskey.backend.modules.users.entity.Role;
import com.campuskey.backend.modules.users.entity.User;
import com.campuskey.backend.modules.users.repository.RoleRepository;
import com.campuskey.backend.modules.users.repository.UserRepository;
import com.campuskey.backend.security.jwt.JwtUtils;
import com.campuskey.backend.security.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthMapper authMapper;

    @Transactional(readOnly = true)
    public AuthResponse signIn(AuthLoginRequest request) {
        log.info("Sign-in requested for username: {}", request.getUsername());
        validateLoginRequest(request);

        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername().trim(), request.getPassword())
            );
        } catch (BadCredentialsException exception) {
            log.error("Sign-in failed for username: {}", request.getUsername());
            throw new BadRequestException("Invalid username or password.");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUserName(request.getUsername().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.getUsername()));

        String token = jwtUtils.generateTokenFromUsername((UserDetailsImpl) authentication.getPrincipal());
        log.info("Sign-in succeeded for username: {}", request.getUsername());
        return authMapper.toAuthResponse(user, token);
    }

    @Transactional
    public AuthResponse signUp(AuthSignupRequest request) {
        log.info("Sign-up requested for username: {}", request.getUsername());
        validateSignupRequest(request);
        ensureAnonymousContext();

        String normalizedUsername = request.getUsername().trim();
        if (userRepository.existsByUserName(normalizedUsername)) {
            log.error("Sign-up rejected, username already exists: {}", normalizedUsername);
            throw new BadRequestException("Username is already taken.");
        }

        AppRole requestedRole = request.getRole() == null ? AppRole.ROLE_STUDENT : request.getRole();
        Role role = roleRepository.findByRoleName(requestedRole)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + requestedRole));

        User user = new User(normalizedUsername, request.getEmail().trim(), passwordEncoder.encode(request.getPassword()));
        user.setAccountNonLocked(true);
        user.setAccountNonExpired(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);
        user.setTwoFactorEnabled(false);
        user.setSignUpMethod("email");
        user.setRole(role);

        User savedUser = userRepository.save(user);
        String token = jwtUtils.generateTokenFromUsername(UserDetailsImpl.build(savedUser));

        log.info("Sign-up succeeded for username: {} with role: {}", normalizedUsername, requestedRole);
        return authMapper.toAuthResponse(savedUser, token);
    }

    private void ensureAnonymousContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated() &&
                !"anonymousUser".equals(authentication.getName())) {
            throw new ForbiddenException("Already authenticated users cannot register a new account.");
        }
    }

    private void validateLoginRequest(AuthLoginRequest request) {
        if (request == null) {
            throw new BadRequestException("Login request is required.");
        }
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new BadRequestException("Username is required.");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new BadRequestException("Password is required.");
        }
    }

    private void validateSignupRequest(AuthSignupRequest request) {
        if (request == null) {
            throw new BadRequestException("Signup request is required.");
        }
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new BadRequestException("Username is required.");
        }
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new BadRequestException("Email is required.");
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new BadRequestException("Password is required.");
        }
    }
}

