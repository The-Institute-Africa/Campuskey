package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Student;
import com.campuskey.backend.entities.StudentFavorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentFavoriteRepository extends JpaRepository<StudentFavorite, Long> {
    List<StudentFavorite> findAllByStudentOrderByCreatedAtDesc(Student student);
    Optional<StudentFavorite> findByStudentAndProperty_Id(Student student, Long propertyId);
}
