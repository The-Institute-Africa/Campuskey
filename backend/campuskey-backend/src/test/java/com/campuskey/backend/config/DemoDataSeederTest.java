package com.campuskey.backend.config;

import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.BookingRepository;
import com.campuskey.backend.repositories.InquiryRepository;
import com.campuskey.backend.repositories.PropertyRepository;
import com.campuskey.backend.repositories.StudentFavoriteRepository;
import com.campuskey.backend.repositories.UserRepository;
import org.springframework.boot.DefaultApplicationArguments;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ActiveProfiles({"test", "demo"})
@TestPropertySource(properties = {
        "campuskey.demo-data.enabled=true",
        "campuskey.demo-data.student-password=CampuskeyDemoStudent!2026",
        "campuskey.demo-data.landlord-password=CampuskeyDemoLandlord!2026"
})
class DemoDataSeederTest {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private InquiryRepository inquiryRepository;

    @Autowired
    private StudentFavoriteRepository favoriteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DemoDataSeeder seeder;

    @Test
    void seedsVisibleApprovedListingsAndDemoWorkflowAccountsIdempotently() throws Exception {
        seeder.run(new DefaultApplicationArguments());

        var listings = propertyRepository.findAllByVerification_Status(PropertyStatus.APPROVED);

        assertTrue(listings.stream().filter(property -> property.getSlug().startsWith("demo-")).count() >= 3);
        var student = userRepository.findByUserName("demo_student").orElseThrow();
        var landlord = userRepository.findByUserName("demo_landlord").orElseThrow();
        assertTrue(passwordEncoder.matches("CampuskeyDemoStudent!2026", student.getPassword()));
        assertTrue(passwordEncoder.matches("CampuskeyDemoLandlord!2026", landlord.getPassword()));
        assertEquals(1, bookingRepository.count());
        assertEquals(1, inquiryRepository.count());
        assertEquals(1, favoriteRepository.count());
    }
}
