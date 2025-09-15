package com.campuskey.backend.entities;

import javax.annotation.processing.Generated;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

import java.math.BigInteger;
import java.sql.Date;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String StudentNumber;
    private Boolean Status;
    private Date loginDate;
    private BigInteger studentContact;
    public Student() {
    }

    public Student(Long id, String studentNumber, Boolean status , Date loginDate , BigInteger studentContact ) {
        this.id = id;
        this.StudentNumber = studentNumber;
        this.Status = status;
        this.loginDate = loginDate;
        this.studentContact = studentContact;
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

    public Date getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }

    public BigInteger getStudentContact() {
        return studentContact;
    }

    public void setStudentContact(BigInteger studentContact) {
        this.studentContact = studentContact;
    }

    @Override
    public String toString() {
        return String.format(
                "Student[id=%d, StudentNumber='%s', Status=%s , loginDate='%s']",
                id, StudentNumber, Status , loginDate);
    }

}