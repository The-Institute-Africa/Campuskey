package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface landlordRepositories extends JpaRepository <Landlord,Long> {

    Optional<Landlord> findByContact (Integer contact);
}
