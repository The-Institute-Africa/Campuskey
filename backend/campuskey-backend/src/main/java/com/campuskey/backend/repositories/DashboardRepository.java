package com.campuskey.backend.repositories;

import com.campuskey.backend.entities.User;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<User, Long> {

    @Query("SELECT COUNT(s) FROM Student s")
    Long countStudents();

    @Query("SELECT COUNT(l) FROM Landlord l")
    Long countLandlords();

    @Query("""
    SELECT COUNT(e)
    FROM User e
    WHERE e.accountStatus = :status
""")
    Long countByAccountStatus(@Param("status") AccountStatus accountStatus);


    @Query("SELECT COUNT(l) FROM Landlord l WHERE MONTH(l.createdAt) = MONTH(CURRENT_DATE)")
    Long countNewLandlordsThisMonth();

    @Query("SELECT COUNT(s) FROM Student s WHERE MONTH(s.createdAt) = MONTH(CURRENT_DATE)")
    Long countNewStudentsThisMonth();

    @Query("SELECT COUNT(p) FROM Property p")
    Long countProperties();


}


