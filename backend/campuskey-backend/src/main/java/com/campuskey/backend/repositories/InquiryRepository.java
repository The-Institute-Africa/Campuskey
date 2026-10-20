package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Inquiry;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findAllByStudentOrderByCreatedAtDesc(Student student);

    List<Inquiry> findAllByProperty_LandlordOrderByCreatedAtDesc(Landlord landlord);

    Optional<Inquiry> findByIdAndProperty_Landlord(Long id, Landlord landlord);

    Optional<Inquiry> findByIdAndStudent(Long id, Student student);
}
