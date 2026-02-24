package com.campuskey.backend.dto;

public class AdminDashboardDto {

    private Long totalProperties;
    private Long totalLandlords;
    private Long totalStudents;

    private Long newLandlords;
    private Long newStudents;

    private Long verifiedAccounts;
    private Long unverifiedAccounts;
    private Long suspendedAccounts;

    public AdminDashboardDto(Long totalProperties,
                             Long totalLandlords,
                             Long totalStudents,
                             Long newLandlords,
                             Long newStudents,
                             Long verifiedAccounts,
                             Long unverifiedAccounts,
                             Long suspendedAccounts) {

        this.totalProperties = totalProperties;
        this.totalLandlords = totalLandlords;
        this.totalStudents = totalStudents;

        this.newLandlords = newLandlords;
        this.newStudents = newStudents;

        this.verifiedAccounts = verifiedAccounts;
        this.unverifiedAccounts = unverifiedAccounts;
        this.suspendedAccounts = suspendedAccounts;
    }

    public AdminDashboardDto(Long totalProperties, Long totalLandlords, Long totalStudents, Long newLandlords, Long newStudents) {
    }


    // Getters

    public Long getTotalProperties() {
        return totalProperties;
    }
    public Long getTotalStudents() {
        return totalStudents;
    }
    public Long getNewStudents() {
        return newStudents;
    }
    public Long getNewLandlords() {
        return newLandlords;
    }
    public Long getTotalLandlords() {
        return totalLandlords;
    }

    public Long getVerifiedAccounts() {
        return verifiedAccounts;
    }

    public Long getUnverifiedAccounts() {
        return unverifiedAccounts;
    }

    public Long getSuspendedAccounts() {
        return suspendedAccounts;
    }

    // Setters

    public void setTotalProperties(Long totalProperties) {
        this.totalProperties = totalProperties;
    }

    public void setNewStudents(Long newStudents) {
        this.newStudents = newStudents;
    }

    public void setNewLandlords(Long newLandlords) {
        this.newLandlords = newLandlords;
    }

    public void setTotalStudents(Long totalStudents) {
        this.totalStudents = totalStudents;
    }

    public void setTotalLandlords(Long totalLandlords) {
        this.totalLandlords = totalLandlords;
    }

    public void setVerifiedAccounts(Long verifiedAccounts) {
        this.verifiedAccounts = verifiedAccounts;
    }

    public void setUnverifiedAccounts(Long unverifiedAccounts) {
        this.unverifiedAccounts = unverifiedAccounts;
    }

    public void setSuspendedAccounts(Long suspendedAccounts) {
        this.suspendedAccounts = suspendedAccounts;
    }
}
