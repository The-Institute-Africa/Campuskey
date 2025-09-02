package com.campuskey.backend.entities;

import javax.annotation.processing.Generated;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String StudentNumber;
    private Boolean Status;

    public Student() {
    }

    public Student(Long id, String studentNumber, Boolean status) {
        this.id = id;
        this.StudentNumber = studentNumber;
        this.Status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setStudentNumber(String studentNumber) {
        this.StudentNumber = studentNumber;
    }

    public String getStudentNumber() {
        return StudentNumber;
    }

    public void setStatus(Boolean status) {
        this.Status = status;
    }

    public Boolean getStatus() {
        return Status;
    }

    @Override
    public String toString() {
        return String.format(
                "Student[id=%d, StudentNumber='%s', Status=%s]",
                id, StudentNumber, Status);
    }

}