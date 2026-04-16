package com.campuskey.backend.modules.users.repository;

import com.campuskey.backend.modules.users.entity.Role;
import com.campuskey.backend.entities.enumerations.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(AppRole roleName);
}



