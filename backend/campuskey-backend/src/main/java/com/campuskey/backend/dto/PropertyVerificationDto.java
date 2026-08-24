package com.campuskey.backend.dto;


import java.time.LocalDateTime;

public class PropertyVerificationDto {

    private Long id;
    private Long propertyId;
    private String status;
    private String inspector;
    private LocalDateTime submittedAt;
    private LocalDateTime verifiedAt;
    private String notes;
    private String documentPath;


    public PropertyVerificationDto() {}

    public PropertyVerificationDto(Long id, Long propertyId, String status, String inspector,
                                   LocalDateTime submittedAt, LocalDateTime verifiedAt,
                                   String notes, String documentPath) {
        this.id = id;
        this.propertyId = propertyId;
        this.status = status;
        this.inspector = inspector;
        this.submittedAt = submittedAt;
        this.verifiedAt = verifiedAt;
        this.notes = notes;
        this.documentPath = documentPath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInspector() {
        return inspector;
    }

    public void setInspector(String inspector) {
        this.inspector = inspector;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getDocumentPath() {
        return documentPath;
    }

    public void setDocumentPath(String documentPath) {
        this.documentPath = documentPath;
    }
}
