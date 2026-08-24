package com.campuskey.backend.services;


import com.campuskey.backend.dto.AdminDashboardDto;
import com.campuskey.backend.dto.LandlordDashboardDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.repositories.DashboardRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class DashboardService {
    private final PropertyRepository propertyRepository;
    private final ReviewRepository reviewRepository;
    private final DashboardRepository dashboardRepository;

    @Autowired
    LandlordRepository landlordRepository;
    public DashboardService(PropertyRepository propertyRepository,
                            ReviewRepository reviewRepository ,DashboardRepository dashboardRepository ) {
        this.propertyRepository = propertyRepository;
        this.reviewRepository = reviewRepository;
        this.dashboardRepository=dashboardRepository;
    }

    public LandlordDashboardDto getDashboardStats(String username) {

        Landlord landlord = landlordRepository
                .findByOwnerUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Landlord not found"));

        long totalListings =
                propertyRepository.countByLandlord(landlord);

        long newListings =
                propertyRepository.countNewListingsByLandlord(
                        landlord,
                        LocalDateTime.now().minusMonths(1)
                );

        long totalViews =
                propertyRepository.getTotalViewsByLandlord(landlord);

        double avgRating =
                Optional.ofNullable(
                        reviewRepository.averageWeightedReview(landlord)
                ).orElse(0.0);


        double listingGrowth =
                totalListings > 0
                        ? (newListings / (double) totalListings) * 100
                        : 0.0;

        return new LandlordDashboardDto(
                totalListings,
                newListings,
                totalViews,
                avgRating,
                listingGrowth
        );
    }

    public AdminDashboardDto getDashboard() {
        Long totalProperties = dashboardRepository.countProperties();
        Long totalStudents = dashboardRepository.countStudents();
        Long totalLandlords = dashboardRepository.countLandlords();


        Long newLandlords = dashboardRepository.countNewLandlordsThisMonth();
        Long newStudents = dashboardRepository.countNewStudentsThisMonth();

        Long verified = dashboardRepository.countByAccountStatus(AccountStatus.VERIFIED);
        Long unverified = dashboardRepository.countByAccountStatus(AccountStatus.UNVERIFIED);
        Long suspended = dashboardRepository.countByAccountStatus(AccountStatus.SUSPENDED);

        return new AdminDashboardDto(
                totalProperties,
                totalLandlords,
                totalStudents,
                newLandlords,
                newStudents,
                verified,
                unverified,
                suspended

        );
    }

}

