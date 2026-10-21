package com.campuskey.backend.dto;

import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import org.junit.jupiter.api.Test;

import java.math.BigInteger;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

class PropertyDtoPrivacyTest {
    @Test
    void publicPropertyDtoDoesNotExposeLandlordProfileContact() {
        Property property = new Property();
        Landlord landlord = new Landlord();
        landlord.setId(22L);
        landlord.setName("Landlord Name");
        landlord.setContact(BigInteger.valueOf(263771234567L));
        landlord.setAddress("Private landlord address");
        landlord.setIdNumber("PRIVATE-ID");
        property.setLandlord(landlord);

        LandlordDto publicLandlord = new PropertyDto(property).getLandlord();
        LandlordDto adminLandlord = new PropertyDto(property, true).getLandlord();

        assertEquals(22L, publicLandlord.getId());
        assertNull(publicLandlord.getName());
        assertNull(publicLandlord.getContact());
        assertEquals("Landlord Name", adminLandlord.getName());
        assertEquals(BigInteger.valueOf(263771234567L), adminLandlord.getContact());
    }
}
