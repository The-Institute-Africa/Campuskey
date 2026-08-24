package com.campuskey.backend.controllers;

import com.campuskey.backend.dto.AdminDashboardDto;
import com.campuskey.backend.dto.LandlordDashboardDto;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.services.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/campuskey")
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

   /* @GetMapping("/landlord/dashboard/stats")
    public Map<String, Object> getStats(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long landlordId
    ) {
        String username = userDetails.getUsername();
        return dashboardService.getDashboardStats(username,landlordId);
    }*/

    @GetMapping("/landlord/dashboard/stats")
    public ResponseEntity<LandlordDashboardDto> getDashboardStats(
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        LandlordDashboardDto stats =
                dashboardService.getDashboardStats(userDetails.getUsername());

        return ResponseEntity.ok(stats);
    }


    @GetMapping("/admin/dashboard")
    public ResponseEntity<AdminDashboardDto> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboard());
    }
}
