package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.StudentDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.repositories.StudentRepository;
import com.campuskey.backend.repositories.UserRepository;
import com.campuskey.backend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/campuskey/")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public StudentController(StudentService studentService){
        this.studentService = studentService;
    }

    @PostMapping("student/create")
    @Transactional
    public void addStudent(
            @RequestBody Student student,
            @AuthenticationPrincipal UserDetails userDetails
    ) throws IllegalAccessException {

        String username = userDetails.getUsername();

        if (studentRepository.existsByOwnerUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A student profile already exists for this account");
        }

        if (student.getStudentName() == null || student.getStudentName().isBlank()
                || student.getStudentNumber() == null || student.getStudentNumber().isBlank()
                || student.getAddress() == null || student.getAddress().isBlank()
                || student.getStudentContact() == null || student.getStudentContact().signum() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Name, student number, contact number, and address are required");
        }

        if (studentRepository.existsByStudentNumber(student.getStudentNumber().strip())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Student number is already registered");
        }

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        student.setStudentName(student.getStudentName().strip());
        student.setStudentNumber(student.getStudentNumber().strip());
        student.setAddress(student.getAddress().strip());
        student.setOwnerUsername(username);
        student.setUser(user);

        studentRepository.save(student);
    }



}
