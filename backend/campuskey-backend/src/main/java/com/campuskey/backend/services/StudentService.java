package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.dto.StudentDto;
import com.campuskey.backend.entities.Student;
import com.campuskey.backend.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService (StudentRepository studentRepository){
        this.studentRepository=studentRepository;
    }

    public List<StudentDto> getAllStudents(){
        return studentRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public StudentDto convertToDto(Student student){
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setStatus(student.getStatus());
        dto.setStudentNumber(student.getStudentNumber());


        return dto;
    }
}
