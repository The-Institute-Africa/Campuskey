package com.campuskey.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigInteger;
import java.time.LocalDateTime;

@Entity
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private String studentName;
    private String studentNumber;
    private BigInteger studentContact;
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String ownerUsername;


    @CreationTimestamp
    private LocalDateTime createdAt;

    public Student() {
    }

    public Student( Long Id, String studentNumber, String studentName,
                    BigInteger studentContact , String ownerUsername ,
                    String address , User user) {
        this.Id=Id;
        this.studentName=studentName;
        this.studentNumber = studentNumber;
        this.studentContact = studentContact;
        this.address=address;
        this.ownerUsername=ownerUsername;
        this.user=user;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public Long getId(){
        return Id;
    }

    public void setStudentName(String StudentName) {
        this.studentName = StudentName;
    }

    public String getStudentName(){
        return studentName;
    }

    public void setStudentNumber(String studentNumber) {
        this.studentNumber = studentNumber;
    }

    public String getStudentNumber() {
        return studentNumber;
    }


    public BigInteger getStudentContact() {
        return studentContact;
    }

    public void setStudentContact(BigInteger studentContact) {
        this.studentContact = studentContact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address= address;
    }
    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String username) {
        this.ownerUsername = username;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}