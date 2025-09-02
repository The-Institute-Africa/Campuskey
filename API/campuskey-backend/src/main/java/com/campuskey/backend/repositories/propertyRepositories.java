package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface propertyRepositories extends JpaRepository <Property,Long> {
    Optional<Property> findByName(String name);

}
