package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface LandlordRepository extends JpaRepository <Landlord,Long> {

    Optional<Landlord> findByContact (BigInteger contact);
    Optional <Landlord> findByName (String name);
    Optional <Landlord> findByOwnerUsername (String userName);

}
