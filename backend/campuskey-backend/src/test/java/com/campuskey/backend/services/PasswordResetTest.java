package com.campuskey.backend.services;

import com.campuskey.backend.entities.PasswordResetToken;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.repositories.PasswordResetTokenRepository;
import com.campuskey.backend.repositories.RoleRepository;
import com.campuskey.backend.repositories.UserRepository;
import com.campuskey.backend.services.impl.UserServiceImpl;
import com.campuskey.backend.utils.EmailService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PasswordResetTest {

    @Mock private UserRepository userRepository;
    @Mock private PasswordResetTokenRepository tokenRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private PasswordEncoder passwordEncoder;
    @Mock private EmailService emailService;
    @InjectMocks private UserServiceImpl userService;

    @Test
    void resetPasswordUpdatesCredentialsAndConsumesToken() {
        User user = new User();
        PasswordResetToken token = new PasswordResetToken("valid-token", Instant.now().plusSeconds(60), user);
        when(tokenRepository.findByToken("valid-token")).thenReturn(Optional.of(token));
        when(passwordEncoder.encode("new-password")).thenReturn("encoded-password");

        userService.resetPassword("valid-token", "new-password");

        assertEquals("encoded-password", user.getPassword());
        assertEquals(true, token.isUsed());
        verify(userRepository).save(user);
        verify(tokenRepository).save(token);
    }

    @Test
    void expiredResetTokenCannotChangePassword() {
        User user = new User();
        PasswordResetToken token = new PasswordResetToken("expired-token", Instant.now().minusSeconds(60), user);
        when(tokenRepository.findByToken("expired-token")).thenReturn(Optional.of(token));

        assertThrows(ResponseStatusException.class, () -> userService.resetPassword("expired-token", "new-password"));

        verify(userRepository, never()).save(user);
    }

    @Test
    void unknownEmailDoesNotRevealAccountExistenceOrSendEmail() {
        when(userRepository.findByEmail("missing@example.com")).thenReturn(Optional.empty());

        userService.generatePasswordResetToken("missing@example.com");

        verifyNoInteractions(emailService);
    }

    @Test
    void resetEmailIsSentForExistingAccount() {
        User user = new User("student", "student@example.com", "old-password");
        ReflectionTestUtils.setField(userService, "frontendUrl", "https://campuskey.example");
        when(userRepository.findByEmail("student@example.com")).thenReturn(Optional.of(user));

        userService.generatePasswordResetToken("student@example.com");

        verify(tokenRepository).save(org.mockito.ArgumentMatchers.argThat(token ->
                token.getUser() == user && token.getExpiryDate().isAfter(Instant.now())));
        verify(emailService).sendPasswordResetEmail(
                org.mockito.ArgumentMatchers.eq("student@example.com"),
                org.mockito.ArgumentMatchers.argThat(url -> url.startsWith("https://campuskey.example/reset-password?token=")));
    }

    @Test
    void authenticatedPasswordChangeRequiresCurrentPassword() {
        User user = new User("student", "student@example.com", "old-encoded");
        when(userRepository.findByUserName("student")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong-password", "old-encoded")).thenReturn(false);

        assertThrows(ResponseStatusException.class,
                () -> userService.changePassword("student", "wrong-password", "new-password"));

        verify(userRepository, never()).save(user);
    }

    @Test
    void authenticatedPasswordChangeEncodesNewPassword() {
        User user = new User("student", "student@example.com", "old-encoded");
        when(userRepository.findByUserName("student")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("current-password", "old-encoded")).thenReturn(true);
        when(passwordEncoder.encode("new-password")).thenReturn("new-encoded");

        userService.changePassword("student", "current-password", "new-password");

        assertEquals("new-encoded", user.getPassword());
        verify(userRepository).save(user);
    }
}
