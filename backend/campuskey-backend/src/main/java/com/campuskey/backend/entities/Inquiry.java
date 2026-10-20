package com.campuskey.backend.entities;

import com.campuskey.backend.entities.enumerations.InquiryStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries", indexes = {
        @Index(name = "idx_inquiry_student_created", columnList = "student_id, created_at"),
        @Index(name = "idx_inquiry_property_status", columnList = "property_id, status")
})
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @Column(nullable = false, length = 2000)
    private String message;

    @Column(length = 2000)
    private String response;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private InquiryStatus status = InquiryStatus.OPEN;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    protected Inquiry() {
    }

    public Inquiry(Student student, Property property, String message) {
        this.student = student;
        this.property = property;
        this.message = message;
        this.status = InquiryStatus.OPEN;
    }

    public Long getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }

    public Property getProperty() {
        return property;
    }

    public String getMessage() {
        return message;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
