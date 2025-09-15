package com.campuskey.backend.dto;

public class StudentDto {

    private Long id;
    private String StudentNumber;
    private Boolean Status;

    public StudentDto() {
    }

    public StudentDto(Long id, String studentNumber, Boolean status) {
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
}
