package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByRoleName(AppRole appRole);
}
