package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.PropertyUtility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyUtilityRepository extends JpaRepository<PropertyUtility,Long> {
}
