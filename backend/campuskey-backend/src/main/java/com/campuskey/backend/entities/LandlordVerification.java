package com.campuskey.backend.entities;

import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "landlord_verifications")
public class LandlordVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private String idNumber;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "landlord_id", nullable = false, unique = true)
    private Landlord landlord;


    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;

    private String documentPath;

    private String ownerUsername ;

    public LandlordVerification() {}

    public LandlordVerification(Long id, String address, String idNumber, Landlord landlord, AccountStatus accountStatus ,String documentPath , String ownerUsername) {
        this.id = id;
        this.address = address;
        this.idNumber = idNumber;
        this.landlord = landlord;
        this.accountStatus = accountStatus;
        this.documentPath=documentPath;
        this.ownerUsername = ownerUsername;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Landlord getLandlord() {
        return landlord;
    }

    public void setLandlord(Landlord landlord) {
        this.landlord = landlord;
    }

    public AccountStatus  getAccountStatus() {
        return  accountStatus;
    }

    public void setAccountStatus(AccountStatus accountStatus) {
        this.accountStatus = accountStatus;
    }

    public String getDocumentPath() {
        return documentPath;
    }

    public void setDocumentPath(String documentPath) {
        this.documentPath = documentPath;
    }

    public void setOwnerUsername(String username) {
        this.ownerUsername = username;
    }
    public String getOwnerusername() {
        return ownerUsername;
    }


}
