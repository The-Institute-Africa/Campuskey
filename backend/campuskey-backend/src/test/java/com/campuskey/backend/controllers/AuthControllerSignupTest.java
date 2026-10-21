package com.campuskey.backend.controllers;

import com.campuskey.backend.entities.Role;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.repositories.RoleRepository;
import com.campuskey.backend.repositories.StudentRepository;
import com.campuskey.backend.repositories.UserRepository;
import com.campuskey.backend.security.jwt.JwtUtils;
import com.campuskey.backend.security.requests.LoginRequest;
import com.campuskey.backend.security.requests.SignupRequest;
import com.campuskey.backend.security.response.MessageResponse;
import com.campuskey.backend.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerSignupTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserService userService;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtUtils jwtUtils;

    @InjectMocks
    private AuthController authController;

    @Test
    void signupRejectsAdminRoleWithoutCreatingUser() {
        SignupRequest request = signupRequest(Set.of("admin"));
        when(userRepository.existsByUserName(request.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);

        ResponseEntity<?> response = authController.registerUser(request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertInstanceOf(MessageResponse.class, response.getBody());
        verify(userRepository, never()).save(any(User.class));
        verify(passwordEncoder, never()).encode(any());
    }

    @Test
    void signupContinuesToAllowLandlordRole() {
        SignupRequest request = signupRequest(Set.of("landlord"));
        Role landlordRole = new Role(AppRole.ROLE_LANDLORD);
        when(userRepository.existsByUserName(request.getUsername())).thenReturn(false);
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(roleRepository.findByRoleName(AppRole.ROLE_LANDLORD)).thenReturn(Optional.of(landlordRole));
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded-password");

        ResponseEntity<?> response = authController.registerUser(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(userRepository).save(org.mockito.ArgumentMatchers.argThat(user ->
                user.getRole() == landlordRole && user.getAccountStatus() == AccountStatus.UNVERIFIED));
    }

    @Test
    void signinReturnsUnauthorizedForBadCredentials() {
        LoginRequest request = new LoginRequest();
        request.setUsername("demo_student");
        request.setPassword("wrong-password");
        when(authenticationManager.authenticate(any()))
                .thenThrow(new BadCredentialsException("Invalid credentials"));

        ResponseEntity<?> response = authController.authenticateUser(request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
    }

    private SignupRequest signupRequest(Set<String> roles) {
        SignupRequest request = new SignupRequest();
        request.setUsername("new-user");
        request.setEmail("new-user@example.com");
        request.setPassword("strong-password");
        request.setRole(roles);
        return request;
    }
}
