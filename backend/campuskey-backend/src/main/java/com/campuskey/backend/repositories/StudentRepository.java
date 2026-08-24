package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    boolean existsByOwnerUsername(String ownerUsername);
    Optional <Student> findByStudentNumber (String studentNumber);
    boolean existsByStudentNumber(String studentNumber);
}
