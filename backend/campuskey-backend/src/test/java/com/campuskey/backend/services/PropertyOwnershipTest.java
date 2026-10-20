package com.campuskey.backend.services;

import com.campuskey.backend.dto.PropertyDto;
import com.campuskey.backend.entities.Landlord;
import com.campuskey.backend.entities.Property;
import com.campuskey.backend.entities.PropertyVerification;
import com.campuskey.backend.entities.User;
import com.campuskey.backend.repositories.PropertyAmenityRepository;
import com.campuskey.backend.repositories.LandlordRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.PropertyRuleRepository;
import com.campuskey.backend.repositories.PropertyUtilityRepository;
import com.campuskey.backend.repositories.PropertyVerificationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PropertyOwnershipTest {

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private LandlordRepository landlordRepository;

    @Mock
    private PropertyVerificationRepository verificationRepository;

    @Mock
    private PropertyImageService propertyImageService;

    @Mock
    private PropertyVideoService propertyVideoService;

    @Mock
    private PropertyAmenityRepository propertyAmenityRepository;

    @Mock
    private PropertyRuleRepository propertyRuleRepository;

    @Mock
    private PropertyUtilityRepository propertyUtilityRepository;

    @InjectMocks
    private PropertyService propertyService;

    @InjectMocks
    private PropertyVerificationService propertyVerificationService;

    @Test
    void landlordCannotUpdateAnotherLandlordsProperty() throws Exception {
        Property property = new Property();
        property.setSlug("another-landlords-property");
        property.setLandlord(landlord(1L, "owner"));
        when(propertyRepository.findBySlug(property.getSlug())).thenReturn(Optional.of(property));
        when(landlordRepository.findByOwnerUsername("caller")).thenReturn(Optional.of(landlord(2L, "caller")));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
                propertyService.updateProperty("caller", property.getSlug(), new PropertyDto(), null, null));

        assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
        verify(propertyRepository, never()).save(any(Property.class));
    }

    @Test
    void landlordCannotSubmitVerificationForAnotherLandlordsProperty() throws Exception {
        Property property = new Property();
        property.setId(12L);
        property.setLandlord(landlord(1L, "owner"));
        when(propertyRepository.findById(12L)).thenReturn(Optional.of(property));

        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () ->
                propertyVerificationService.submitDocument(12L, null, "caller"));

        assertEquals(HttpStatus.FORBIDDEN, exception.getStatusCode());
        verify(verificationRepository, never()).save(any(PropertyVerification.class));
    }

    private Landlord landlord(Long id, String username) {
        User user = new User();
        user.setUserName(username);
        Landlord landlord = new Landlord();
        landlord.setId(id);
        landlord.setUser(user);
        return landlord;
    }
}
