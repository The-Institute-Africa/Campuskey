package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.exceptions.BadRequestException;
import com.campuskey.backend.exceptions.ForbiddenException;
import com.campuskey.backend.exceptions.ResourceNotFoundException;
import com.campuskey.backend.modules.auth.config.PasswordResetSecurityProperties;
import com.campuskey.backend.modules.auth.dto.AuthLoginRequest;
import com.campuskey.backend.modules.auth.dto.AuthResponse;
import com.campuskey.backend.modules.auth.dto.AuthSignupRequest;
import com.campuskey.backend.modules.auth.dto.PasswordResetConfirmRequest;
import com.campuskey.backend.modules.auth.dto.PasswordResetRequest;
import com.campuskey.backend.modules.auth.entity.AuthAuditEventType;
import com.campuskey.backend.modules.auth.entity.PasswordResetToken;
import com.campuskey.backend.modules.auth.mapper.AuthMapper;
import com.campuskey.backend.modules.auth.repository.PasswordResetTokenRepository;
import com.campuskey.backend.modules.users.entity.Role;
import com.campuskey.backend.modules.users.entity.User;
import com.campuskey.backend.modules.users.repository.RoleRepository;
import com.campuskey.backend.modules.users.repository.UserRepository;
import com.campuskey.backend.security.jwt.JwtUtils;
import com.campuskey.backend.security.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final String PASSWORD_RESET_REQUEST_ACCEPTED =
            "If the account exists, a password reset instruction has been created.";

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordResetSecurityProperties passwordResetSecurityProperties;
    private final PasswordResetDeliveryChannel passwordResetDeliveryChannel;
    private final PasswordResetTokenMaintenanceService passwordResetTokenMaintenanceService;
    private final PasswordResetAbusePolicyService passwordResetAbusePolicyService;
    private final AuthAuditEventService authAuditEventService;
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
            authAuditEventService.record(AuthAuditEventType.SIGN_IN, request.getUsername(), false,
                    "invalid_credentials");
            throw new BadRequestException("Invalid username or password.");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByUserName(request.getUsername().trim())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + request.getUsername()));

        String token = jwtUtils.generateTokenFromUsername((UserDetailsImpl) authentication.getPrincipal());
        log.info("Sign-in succeeded for username: {}", request.getUsername());
        authAuditEventService.record(AuthAuditEventType.SIGN_IN, request.getUsername(), true, "authenticated");
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
            authAuditEventService.record(AuthAuditEventType.SIGN_UP, normalizedUsername, false,
                    "username_already_exists");
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
        authAuditEventService.record(AuthAuditEventType.SIGN_UP, normalizedUsername, true, "registered");
        return authMapper.toAuthResponse(savedUser, token);
    }

    @Transactional
    public String requestPasswordReset(PasswordResetRequest request) {
        log.info("Password reset requested");
        validatePasswordResetRequest(request);

        String normalizedUsername = request.getUsername().trim();
        Optional<User> userOptional = userRepository.findByUserName(normalizedUsername);
        if (userOptional.isEmpty()) {
            log.info("Password reset requested for unknown username");
            authAuditEventService.record(AuthAuditEventType.PASSWORD_RESET_REQUEST, normalizedUsername, true,
                    "accepted_unknown_username");
            return PASSWORD_RESET_REQUEST_ACCEPTED;
        }

        User user = userOptional.get();
        Instant now = Instant.now();

        if (!passwordResetAbusePolicyService.canIssueResetToken(user, now)) {
            log.warn("Password reset request throttled for username: {}", normalizedUsername);
            authAuditEventService.record(AuthAuditEventType.PASSWORD_RESET_REQUEST, normalizedUsername, false,
                    "throttled");
            return PASSWORD_RESET_REQUEST_ACCEPTED;
        }

        passwordResetTokenMaintenanceService.cleanupStaleTokens(now);
        passwordResetTokenMaintenanceService.revokeTokensForUser(user.getUserId());

        String rawToken = generateRawToken();
        String tokenHash = sha256(rawToken);
        PasswordResetToken resetToken = new PasswordResetToken(
                tokenHash,
                user,
                now,
                now.plus(passwordResetSecurityProperties.getTokenTtlMinutes(), ChronoUnit.MINUTES)
        );
        passwordResetTokenRepository.save(resetToken);

        passwordResetDeliveryChannel.deliverResetToken(user, rawToken,
                passwordResetSecurityProperties.getTokenTtlMinutes());
        log.info("Password reset token generated for username: {}", normalizedUsername);
        authAuditEventService.record(AuthAuditEventType.PASSWORD_RESET_REQUEST, normalizedUsername, true,
                "token_issued");
        return PASSWORD_RESET_REQUEST_ACCEPTED;
    }

    @Transactional
    public String confirmPasswordReset(PasswordResetConfirmRequest request) {
        log.info("Password reset confirmation requested");
        validatePasswordResetConfirmRequest(request);

        Instant now = Instant.now();
        passwordResetTokenMaintenanceService.cleanupStaleTokens(now);

        String tokenHash = sha256(request.getToken().trim());
        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(tokenHash, now)
                .orElseThrow(() -> {
                    authAuditEventService.record(AuthAuditEventType.PASSWORD_RESET_CONFIRM, null, false,
                            "token_not_found");
                    return new BadRequestException("Invalid or expired password reset token.");
                });

        if (resetToken.isExpired(now) || resetToken.isUsed()) {
            log.error("Password reset token rejected because it is expired or already used");
            authAuditEventService.record(AuthAuditEventType.PASSWORD_RESET_CONFIRM,
                    resetToken.getUser().getUserName(), false, "token_invalid_state");
            throw new BadRequestException("Invalid or expired password reset token.");
        }

        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setCredentialsNonExpired(true);
        userRepository.save(user);

        resetToken.markUsed(now);
        passwordResetTokenRepository.save(resetToken);
        log.info("Password reset completed for username: {}", user.getUserName());
        authAuditEventService.record(AuthAuditEventType.PASSWORD_RESET_CONFIRM, user.getUserName(), true,
                "password_updated");

        return "Password reset completed successfully.";
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

    private void validatePasswordResetRequest(PasswordResetRequest request) {
        if (request == null || request.getUsername() == null || request.getUsername().isBlank()) {
            throw new BadRequestException("Username is required.");
        }
    }

    private void validatePasswordResetConfirmRequest(PasswordResetConfirmRequest request) {
        if (request == null) {
            throw new BadRequestException("Password reset confirmation is required.");
        }
        if (request.getToken() == null || request.getToken().isBlank()) {
            throw new BadRequestException("Reset token is required.");
        }
        if (request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            throw new BadRequestException("New password is required.");
        }
        if (request.getConfirmPassword() == null || request.getConfirmPassword().isBlank()) {
            throw new BadRequestException("Password confirmation is required.");
        }
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("New password and confirmation do not match.");
        }
    }

    private String generateRawToken() {
        byte[] randomBytes = new byte[32];
        SECURE_RANDOM.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }

    private String sha256(String rawToken) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashed = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
            StringBuilder builder = new StringBuilder();
            for (byte hashByte : hashed) {
                builder.append(String.format("%02x", hashByte));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 algorithm is not available.", exception);
        }
    }
}



