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

    @GetMapping("public/student")
    public List<StudentDto> getAllStudents(){
        return studentService.getAllStudents();
    }


    @PostMapping("student/create")
    @Transactional
    public void addStudent(
            @RequestBody Student student,
            @AuthenticationPrincipal UserDetails userDetails
    ) throws IllegalAccessException {

        String username = userDetails.getUsername();

        if (studentRepository.existsByStudentNumber(student.getStudentNumber())) {
            throw new IllegalAccessException("Student already exists");
        }

        User user = userRepository.findByUserName(username)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        student.setOwnerUsername(username);
        student.setUser(user);

        studentRepository.save(student);
    }



}
