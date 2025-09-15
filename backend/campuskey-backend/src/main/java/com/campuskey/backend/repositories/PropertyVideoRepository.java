package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.PropertyVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyVideoRepository extends JpaRepository<PropertyVideo,Long> {
}
