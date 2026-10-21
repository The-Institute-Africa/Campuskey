package com.campuskey.backend.controllers;

import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.entities.Role;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.repositories.RoleRepository;
import com.campuskey.backend.repositories.StudentRepository;
import com.campuskey.backend.repositories.UserRepository;
import com.campuskey.backend.security.jwt.JwtUtils;
import com.campuskey.backend.security.requests.LoginRequest;
import com.campuskey.backend.security.requests.SignupRequest;
import com.campuskey.backend.security.response.LoginResponse;
import com.campuskey.backend.security.response.MessageResponse;
import com.campuskey.backend.security.response.UserInfoResponse;
import com.campuskey.backend.services.UserService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@Validated
@RequestMapping("/api/v1/campuskey/auth")
public class AuthController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserService userService;

    @Autowired
    StudentRepository studentRepository;




    @PostMapping("/public/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.UNAUTHORIZED);
        }

//      set the authentication
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        // ✅ Load User entity from DB
        User user = userRepository.findByUserName(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String status = user.getAccountStatus().name();

        // Prepare the response body, now including the JWT token directly in the body
        LoginResponse response = new LoginResponse(userDetails.getUsername(), status, jwtToken);

        // Return the response entity with the JWT token included in the response body
        return ResponseEntity.ok(response);
    }

    @PostMapping("/public/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        if (userRepository.existsByUserName(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Set<String> strRoles = signUpRequest.getRole();
        if (strRoles == null || strRoles.size() != 1) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Select exactly one account role."));
        }

        String requestedRole = strRoles.iterator().next();
        if (requestedRole == null || requestedRole.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Select a valid account role."));
        }

        AppRole appRole = switch (requestedRole.toLowerCase(Locale.ROOT)) {
            case "landlord" -> AppRole.ROLE_LANDLORD;
            case "student" -> AppRole.ROLE_STUDENT;
            default -> null;
        };
        if (appRole == null) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: This account role cannot be self-registered."));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        user.setSignUpMethod("email");
        user.setAccountNonLocked(true);
        user.setAccountNonExpired(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);
        user.setTwoFactorEnabled(false);

        Role role = roleRepository.findByRoleName(appRole)
                .orElseThrow(() -> new IllegalStateException("Configured account role not found."));

        // Account status logic
        if (role.getRoleName().equals(AppRole.ROLE_LANDLORD)) {
            user.setAccountStatus(AccountStatus.UNVERIFIED);
        } else {
            user.setAccountStatus(AccountStatus.VERIFIED);
        }

        user.setRole(role);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

/*
    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByUsername(userDetails.getUsername());

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        List<String> status = user.getStatus().stream()
                .map(Enum::name)
                .toList();

        UserInfoResponse response = new UserInfoResponse(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.isAccountNonLocked(),
                user.isAccountNonExpired(),
                user.isCredentialsNonExpired(),
                user.isEnabled(),
                user.getCredentialsExpiryDate(),
                user.getAccountExpiryDate(),
                user.isTwoFactorEnabled(),
                roles,
                status
        );

        return ResponseEntity.ok().body(response);
    } */

    @GetMapping("/username")
    public String currentUserName(@AuthenticationPrincipal UserDetails userDetails) {
        return (userDetails != null) ? userDetails.getUsername() : "";
    }

    @PostMapping("/public/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam @Email @NotBlank String email){
        try{
            userService.generatePasswordResetToken(email);
            return ResponseEntity.ok(new MessageResponse(
                    "If an account exists for that email, a password reset link will be sent."));
        } catch (org.springframework.mail.MailException e){
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(new MessageResponse("Password reset email could not be sent. Please try again later."));
        }
    }

    public record PasswordResetRequest(
            @NotBlank String token,
            @NotBlank @Size(min = 8, max = 128) String password) {}

    @PostMapping("/public/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequest request) {
        userService.resetPassword(request.token(), request.password());
        return ResponseEntity.ok(new MessageResponse("Password reset successfully. You can now sign in."));
    }

    public record ChangePasswordRequest(
            @NotBlank String currentPassword,
            @NotBlank @Size(min = 8, max = 128) String newPassword) {}

    @PutMapping("/password")
    public ResponseEntity<?> changePassword(
            @AuthenticationPrincipal UserDetails user,
            @Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(user.getUsername(), request.currentPassword(), request.newPassword());
        return ResponseEntity.ok(new MessageResponse("Password updated successfully."));
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoResponse> getMe(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = userService.findByUsername(userDetails.getUsername());

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        String accountStatus = user.getAccountStatus() != null
                ? user.getAccountStatus().name()
                : null;


        boolean hasStudentProfile = false;
        boolean studentProfileComplete = false;

        if (roles.contains("ROLE_STUDENT")) {
            var student = studentRepository.findFirstByOwnerUsernameOrderByIdAsc(user.getUserName());
            hasStudentProfile = student.isPresent();
            studentProfileComplete = student.filter(profile ->
                    profile.getStudentName() != null && !profile.getStudentName().isBlank()
                            && profile.getStudentNumber() != null && !profile.getStudentNumber().isBlank()
                            && profile.getStudentContact() != null && profile.getStudentContact().signum() > 0
                            && profile.getAddress() != null && !profile.getAddress().isBlank()).isPresent();
        }

        UserInfoResponse response = new UserInfoResponse(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.isAccountNonLocked(),
                user.isAccountNonExpired(),
                user.isCredentialsNonExpired(),
                user.isEnabled(),
                user.getCredentialsExpiryDate(),
                user.getAccountExpiryDate(),
                user.isTwoFactorEnabled(),
                roles,
                accountStatus,
                hasStudentProfile,
                studentProfileComplete,
                user.getAccountState() == null ? "ACTIVE" : user.getAccountState().name()
        );

        return ResponseEntity.ok(response);
    }

}
