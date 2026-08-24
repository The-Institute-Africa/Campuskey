package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.PropertyRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRuleRepository extends JpaRepository<PropertyRule,Long> {
}
