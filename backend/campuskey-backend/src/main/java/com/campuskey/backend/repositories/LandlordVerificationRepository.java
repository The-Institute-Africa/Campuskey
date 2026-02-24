package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.LandlordVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LandlordVerificationRepository extends JpaRepository<LandlordVerification,Long> {
   // Boolean existsByUsername(String username);
    Boolean existsByLandlordOwnerUsername(String ownerUsername);
    boolean existsByLandlordId(Long landlordId);
    Optional<LandlordVerification> findByLandlord(Landlord landlord);

}
