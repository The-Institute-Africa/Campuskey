package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.PropertyVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropertyVerificationRepository extends JpaRepository<PropertyVerification,Long> {
    Optional<PropertyVerification> findByPropertyId(Long propertyId);
}
