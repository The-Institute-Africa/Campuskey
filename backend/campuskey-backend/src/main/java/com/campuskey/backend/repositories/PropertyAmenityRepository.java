package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.PropertyAmenity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyAmenityRepository extends JpaRepository<PropertyAmenity,Long> {

}
