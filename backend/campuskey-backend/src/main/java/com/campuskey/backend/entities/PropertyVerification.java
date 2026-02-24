package com.campuskey.backend.entities;

import com.campuskey.backend.entities.enumerations.PropertyStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class PropertyVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @Enumerated(EnumType.STRING)
    private PropertyStatus status = PropertyStatus.PENDING;

    private String inspector;
    private LocalDateTime submittedAt = LocalDateTime.now();
    private LocalDateTime verifiedAt;
    private String notes;
    private String documentPath;


    public PropertyVerification(){}

    public PropertyVerification(Long id , PropertyStatus status, String inspector,
                                LocalDateTime verifiedAt, String notes, LocalDateTime submittedAt,
                                String documentPath){

        this.id=id;
        this.status=status;
        this.inspector=inspector;
        this.submittedAt=submittedAt;
        this.verifiedAt=verifiedAt;
        this.notes=notes;
        this.documentPath=documentPath;
    }


    public PropertyVerification(Property property) {
        this.property = property;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public PropertyStatus getStatus() {
        return status;
    }

    public void setStatus(PropertyStatus status) {
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

    @Override
    public String toString() {
        return "Verification{" +
                "id=" + id +
                ", property=" + property +
                ", status=" + status +
                ", inspector='" + inspector + '\'' +
                ", submittedAt=" + submittedAt +
                ", verifiedAt=" + verifiedAt +
                ", notes='" + notes + '\'' +
                ", documentPath='" + documentPath + '\'' +
                '}';
    }

}
