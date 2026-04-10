package com.campuskey.backend.modules.auth.controller;

import com.campuskey.backend.modules.auth.dto.AuthLoginRequest;
import com.campuskey.backend.modules.auth.dto.AuthResponse;
import com.campuskey.backend.modules.auth.dto.AuthSignupRequest;
import com.campuskey.backend.modules.auth.dto.PasswordResetConfirmRequest;
import com.campuskey.backend.modules.auth.dto.PasswordResetRequest;
import com.campuskey.backend.modules.auth.services.AuthService;
import com.campuskey.backend.security.response.MessageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/campuskey/auth/public")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;

	@PostMapping("/signin")
	public AuthResponse signIn(@Valid @RequestBody AuthLoginRequest request) {
		return authService.signIn(request);
	}

	@PostMapping("/signup")
	public AuthResponse signUp(@Valid @RequestBody AuthSignupRequest request) {
		return authService.signUp(request);
	}

	@PostMapping("/password-reset/request")
	public ResponseEntity<MessageResponse> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(new MessageResponse(authService.requestPasswordReset(request)));
	}

	@PostMapping("/password-reset/confirm")
	public ResponseEntity<MessageResponse> confirmPasswordReset(@Valid @RequestBody PasswordResetConfirmRequest request) {
		return ResponseEntity.ok(new MessageResponse(authService.confirmPasswordReset(request)));
	}
}

