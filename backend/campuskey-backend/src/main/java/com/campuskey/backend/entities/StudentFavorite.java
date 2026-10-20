package com.campuskey.backend.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_favorites", uniqueConstraints = @UniqueConstraint(
        name = "uk_student_favorite_property", columnNames = {"student_id", "property_id"}))
public class StudentFavorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    protected StudentFavorite() {
    }

    public StudentFavorite(Student student, Property property) {
        this.student = student;
        this.property = property;
    }

    public Long getId() {
        return id;
    }

    public Property getProperty() {
        return property;
    }
}
