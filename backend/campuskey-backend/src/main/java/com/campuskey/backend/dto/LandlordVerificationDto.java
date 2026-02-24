package com.campuskey.backend.dto;

import com.campuskey.backend.entities.enumerations.AccountStatus;

public class LandlordVerificationDto {

    private Long id;
    private String address;
    private String idNumber;
    private Long landlordId;
    private AccountStatus accountStatus;
    private String documentPath;
    private String ownerusername;
    public LandlordVerificationDto() {}

    public LandlordVerificationDto(Long id, String address, String idNumber,
                                   Long landlordId, AccountStatus accountStatus , String documentPath ,
                                   String ownerusername) {
        this.id = id;
        this.address = address;
        this.idNumber = idNumber;
        this.landlordId = landlordId;
        this.accountStatus=accountStatus;
        this.documentPath=documentPath;
        this.ownerusername=ownerusername;
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

    public Long getLandlordId() {
        return landlordId;
    }

    public void setLandlordId(Long landlordId) {
        this.landlordId = landlordId;
    }

    public AccountStatus getAccountStatus() {
        return accountStatus;
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


    public void setOwnerusername(String ownerusername) {
        this.ownerusername = ownerusername;
    }

    public String getOwnerusername() {
        return ownerusername;
    }



}
