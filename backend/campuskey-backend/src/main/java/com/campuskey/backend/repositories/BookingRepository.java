package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Booking;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByStudentOrderByCreatedAtDesc(Student student);

    List<Booking> findAllByProperty_LandlordOrderByCreatedAtDesc(Landlord landlord);

    Optional<Booking> findByIdAndProperty_Landlord(Long id, Landlord landlord);

    Optional<Booking> findByIdAndStudent(Long id, Student student);

    boolean existsByStudent_IdAndProperty_Landlord_Id(Long studentId, Long landlordId);
}
