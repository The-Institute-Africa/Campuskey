package com.campuskey.backend.dto;

import com.campuskey.backend.entities.enumerations.AccountState;

import java.math.BigInteger;

public record ProfileDto(
        String role,
        String name,
        BigInteger contact,
        String studentNumber,
        String address,
        String idNumber,
        AccountState accountState,
        boolean complete
) {
}
