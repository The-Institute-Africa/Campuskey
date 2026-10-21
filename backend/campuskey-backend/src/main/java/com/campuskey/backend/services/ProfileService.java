package com.campuskey.backend.services;

import com.campuskey.backend.dto.ProfileDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.AccountState;
import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.repositories.BookingRepository;
import com.campuskey.backend.repositories.InquiryRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.StudentRepository;
import com.campuskey.backend.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.util.Objects;

@Service
public class ProfileService {
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;
    private final InquiryRepository inquiryRepository;
    private final BookingRepository bookingRepository;

    public ProfileService(UserRepository userRepository, StudentRepository studentRepository,
                         LandlordRepository landlordRepository, InquiryRepository inquiryRepository,
                         BookingRepository bookingRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
        this.inquiryRepository = inquiryRepository;
        this.bookingRepository = bookingRepository;
    }

    @Transactional(readOnly = true)
    public ProfileDto mine(String username) {
        User user = getUser(username);
        String role = role(user);
        AccountState state = state(user);
        if (AppRole.ROLE_STUDENT.name().equals(role)) {
            return studentRepository.findFirstByOwnerUsernameOrderByIdAsc(username)
                    .map(student -> studentProfile(student, state))
                    .orElseGet(() -> new ProfileDto(role, null, null, null, null, null, state, false));
        }
        if (AppRole.ROLE_LANDLORD.name().equals(role)) {
            return landlordRepository.findByOwnerUsername(username)
                    .map(landlord -> landlordProfile(landlord, state))
                    .orElseGet(() -> new ProfileDto(role, null, null, null, null, null, state, false));
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Profiles are only available to students and landlords");
    }

    @Transactional
    public ProfileDto updateMine(String username, ProfileDto request) {
        User user = getUser(username);
        ensureActive(user);
        if (AppRole.ROLE_STUDENT.name().equals(role(user))) {
            Student student = studentRepository.findFirstByOwnerUsernameOrderByIdAsc(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT,
                            "Create your student profile before updating it"));
            validateRequired(request.name(), "Name");
            validateRequired(request.studentNumber(), "Student number");
            validateContact(request.contact());
            validateRequired(request.address(), "Address");
            if (!Objects.equals(student.getStudentNumber(), request.studentNumber().strip())
                    && studentRepository.existsByStudentNumber(request.studentNumber().strip())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Student number is already registered");
            }
            student.setStudentName(request.name().strip());
            student.setStudentNumber(request.studentNumber().strip());
            student.setStudentContact(request.contact());
            student.setAddress(request.address().strip());
            return studentProfile(student, state(user));
        }
        if (AppRole.ROLE_LANDLORD.name().equals(role(user))) {
            Landlord landlord = landlordRepository.findByOwnerUsername(username)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT,
                            "Create your landlord profile before updating it"));
            validateRequired(request.name(), "Name");
            validateContact(request.contact());
            validateRequired(request.address(), "Address");
            validateRequired(request.idNumber(), "ID or passport number");
            landlord.setName(request.name().strip());
            landlord.setContact(request.contact());
            landlord.setAddress(request.address().strip());
            landlord.setIdNumber(request.idNumber().strip());
            return landlordProfile(landlord, state(user));
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Profiles are only available to students and landlords");
    }

    @Transactional(readOnly = true)
    public ProfileDto landlordForStudent(String username, Long landlordId) {
        requireRole(username, AppRole.ROLE_STUDENT);
        Student student = studentRepository.findFirstByOwnerUsernameOrderByIdAsc(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Student profile not found"));
        Landlord landlord = landlordRepository.findById(landlordId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
        if (!hasInteraction(student.getId(), landlordId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only view profiles linked to your inquiries or bookings");
        }
        return new ProfileDto("LANDLORD", landlord.getName(), landlord.getContact(), null, null, null, null, true);
    }

    @Transactional(readOnly = true)
    public ProfileDto studentForLandlord(String username, Long studentId) {
        requireRole(username, AppRole.ROLE_LANDLORD);
        Landlord landlord = landlordRepository.findByOwnerUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Landlord profile not found"));
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
        if (!hasInteraction(studentId, landlord.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only view profiles linked to your inquiries or bookings");
        }
        return new ProfileDto("STUDENT", student.getStudentName(), student.getStudentContact(), null, null, null, null, true);
    }

    @Transactional
    public AccountState changeState(String username, AccountState target) {
        User user = getUser(username);
        if (!AppRole.ROLE_STUDENT.name().equals(role(user))
                && !AppRole.ROLE_LANDLORD.name().equals(role(user))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Account lifecycle controls are only available to students and landlords");
        }
        AccountState current = state(user);
        if (target == AccountState.SUSPENDED && current == AccountState.ACTIVE) {
            user.setAccountState(target);
        } else if (target == AccountState.ACTIVE && current == AccountState.SUSPENDED) {
            user.setAccountState(target);
        } else if (target == AccountState.DELETED && current != AccountState.DELETED) {
            user.setAccountState(target);
            redactProfile(username);
        } else {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "This account state change is not available");
        }
        return user.getAccountState();
    }

    private void redactProfile(String username) {
        studentRepository.findFirstByOwnerUsernameOrderByIdAsc(username).ifPresent(student -> {
            student.setStudentName("Deleted account");
            student.setStudentNumber(null);
            student.setStudentContact(null);
            student.setAddress(null);
            student.setOwnerUsername(null);
        });
        landlordRepository.findByOwnerUsername(username).ifPresent(landlord -> {
            landlord.setName("Deleted account");
            landlord.setContact(null);
            landlord.setIdNumber(null);
            landlord.setAddress(null);
            landlord.setOwnerUsername(null);
        });
    }

    private boolean hasInteraction(Long studentId, Long landlordId) {
        return inquiryRepository.existsByStudent_IdAndProperty_Landlord_Id(studentId, landlordId)
                || bookingRepository.existsByStudent_IdAndProperty_Landlord_Id(studentId, landlordId);
    }

    private ProfileDto studentProfile(Student student, AccountState state) {
        return new ProfileDto("STUDENT", student.getStudentName(), student.getStudentContact(),
                student.getStudentNumber(), student.getAddress(), null, state, isComplete(student));
    }

    private ProfileDto landlordProfile(Landlord landlord, AccountState state) {
        return new ProfileDto("LANDLORD", landlord.getName(), landlord.getContact(),
                null, landlord.getAddress(), landlord.getIdNumber(), state,
                nonblank(landlord.getName()) && landlord.getContact() != null && nonblank(landlord.getAddress())
                        && nonblank(landlord.getIdNumber()));
    }

    private boolean isComplete(Student student) {
        return nonblank(student.getStudentName()) && nonblank(student.getStudentNumber())
                && student.getStudentContact() != null && student.getStudentContact().signum() > 0
                && nonblank(student.getAddress());
    }

    private void validateRequired(String value, String field) {
        if (!nonblank(value)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, field + " is required");
        }
    }

    private void validateContact(BigInteger contact) {
        if (contact == null || contact.signum() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A valid contact number is required");
        }
    }

    private boolean nonblank(String value) {
        return value != null && !value.isBlank();
    }

    private String role(User user) {
        return user.getRole().getRoleName().name();
    }

    private AccountState state(User user) {
        return user.getAccountState() == null ? AccountState.ACTIVE : user.getAccountState();
    }

    private User getUser(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));
    }

    private void requireRole(String username, AppRole requiredRole) {
        if (getUser(username).getRole().getRoleName() != requiredRole) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This profile view is not available to your role");
        }
    }

    private void ensureActive(User user) {
        if (state(user) != AccountState.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.LOCKED, "Reactivate your account before editing your profile");
        }
    }
}
