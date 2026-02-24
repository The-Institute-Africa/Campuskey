package com.campuskey.backend.services;

import com.campuskey.backend.dto.StudentDto;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.repositories.StudentRepository;
import com.campuskey.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    public StudentService (StudentRepository studentRepository){
        this.studentRepository=studentRepository;
    }

    public List<StudentDto> getAllStudents(){
        return studentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    public void addStudent (Student student ,String username) throws IllegalAccessException{
        Optional<Student> studentOptional = studentRepository.findByStudentNumber(
                student.getStudentNumber());
        if(studentOptional.isPresent()){
            throw new IllegalAccessException("Student Already exists");
        }

        student.setOwnerUsername(username);
            studentRepository.save(student);
    }

    public StudentDto convertToDto(Student student){
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setStudentContact(student.getStudentContact());
        dto.setStudentNumber(student.getStudentNumber());

        return dto;
    }
}
