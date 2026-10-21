package com.campuskey.backend.repositories;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PropertyRepository extends JpaRepository <Property,Long>,JpaSpecificationExecutor<Property> {
    Optional<Property> findByLocation(String Location);
    Optional<Property> findBySlug(String slug);
    List<Property> findAllByVerification_Status(PropertyStatus status);
    List<PropertyDto> findByLandlord(Landlord landlord);

    @Modifying(flushAutomatically = true)
    @Query("UPDATE Property p SET p.views = COALESCE(p.views, 0) + 1 WHERE p.id = :propertyId")
    int incrementViews(@Param("propertyId") Long propertyId);

    long countByLandlord(Landlord landlord);

    @Query("""
        SELECT COUNT(p)
        FROM Property p
        WHERE p.landlord = :landlord
        AND p.createdAt >= :since
    """)
    long countNewListingsByLandlord(
            @Param("landlord") Landlord landlord,
            @Param("since") LocalDateTime since
    );

    @Query("""
        SELECT COALESCE(SUM(p.views), 0)
        FROM Property p
        WHERE p.landlord = :landlord
    """)
    long getTotalViewsByLandlord(@Param("landlord") Landlord landlord);

}
