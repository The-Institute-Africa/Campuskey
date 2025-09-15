package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository <Property,Long>,JpaSpecificationExecutor<Property> {
    Optional<Property> findByName(String Location);
    Optional<Property> findBySlug(String slug);

}
