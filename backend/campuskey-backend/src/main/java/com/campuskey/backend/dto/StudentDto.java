package com.campuskey.backend.dto;

import java.math.BigInteger;

public class StudentDto{

    private Long Id;
    private String StudentName ;
    private String StudentNumber;
    private BigInteger StudentContact;
    private String address;

    public StudentDto() {
    }

    public StudentDto(Long Id , String StudentName, String studentNumber,
                      BigInteger studentContact ,String address) {
        this.Id=Id;
        this.StudentName=StudentName;
        this.StudentNumber = studentNumber;
        this.StudentContact=studentContact;
        this.address=address;
    }

    public void setId(Long Id) {
        this.Id  = Id;
    }

    public Long getId(){
        return Id;
    }

    public void setName(String StudentName) {
        this.StudentName = StudentName;
    }

    public String getStudentName(){
        return StudentName;
    }
    public void setStudentNumber(String studentNumber) {
        this.StudentNumber = studentNumber;
    }

    public String getStudentNumber() {
        return StudentNumber;
    }

    public BigInteger getStudentContact() {
        return StudentContact;
    }

    public void setStudentContact(BigInteger StudentContact) {
        this.StudentContact = StudentContact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address= address;
    }


}
