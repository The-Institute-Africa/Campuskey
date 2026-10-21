package com.campuskey.backend.config;

import com.campuskey.backend.entities.*;
import com.campuskey.backend.entities.enumerations.AccountStatus;
import com.campuskey.backend.entities.enumerations.AppRole;
import com.campuskey.backend.entities.enumerations.BookingStatus;
import com.campuskey.backend.entities.enumerations.InquiryStatus;
import com.campuskey.backend.entities.enumerations.PropertyStatus;
import com.campuskey.backend.repositories.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Profile("demo & !prod")
@ConditionalOnProperty(name = "campuskey.demo-data.enabled", havingValue = "true")
public class DemoDataSeeder implements ApplicationRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final LandlordRepository landlordRepository;
    private final PropertyRepository propertyRepository;
    private final BookingRepository bookingRepository;
    private final InquiryRepository inquiryRepository;
    private final StudentFavoriteRepository favoriteRepository;
    private final PasswordEncoder passwordEncoder;
    private final String studentPassword;
    private final String landlordPassword;
    private final String adminPassword;

    public DemoDataSeeder(
            RoleRepository roleRepository,
            UserRepository userRepository,
            StudentRepository studentRepository,
            LandlordRepository landlordRepository,
            PropertyRepository propertyRepository,
            BookingRepository bookingRepository,
            InquiryRepository inquiryRepository,
            StudentFavoriteRepository favoriteRepository,
            PasswordEncoder passwordEncoder,
            @Value("${campuskey.demo-data.student-password}") String studentPassword,
            @Value("${campuskey.demo-data.landlord-password}") String landlordPassword,
            @Value("${campuskey.demo-data.admin-password}") String adminPassword) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.landlordRepository = landlordRepository;
        this.propertyRepository = propertyRepository;
        this.bookingRepository = bookingRepository;
        this.inquiryRepository = inquiryRepository;
        this.favoriteRepository = favoriteRepository;
        this.passwordEncoder = passwordEncoder;
        this.studentPassword = studentPassword;
        this.landlordPassword = landlordPassword;
        this.adminPassword = adminPassword;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments arguments) {
        if (studentPassword.isBlank() || landlordPassword.isBlank() || adminPassword.isBlank()) {
            throw new IllegalStateException(
                    "Set all CAMPUSKEY_DEMO_*_PASSWORD values when demo seeding is enabled");
        }

        User studentUser = ensureUser("demo_student", "demo.student@campuskey.test",
                studentPassword, AppRole.ROLE_STUDENT);
        User landlordUser = ensureUser("demo_landlord", "demo.landlord@campuskey.test",
                landlordPassword, AppRole.ROLE_LANDLORD);
        ensureUser("demo_admin", "demo.admin@campuskey.test", adminPassword, AppRole.ROLE_ADMIN);
        Student student = studentRepository.findFirstByOwnerUsernameOrderByIdAsc(studentUser.getUserName())
                .orElseGet(() -> createStudent(studentUser));
        Landlord landlord = landlordRepository.findByOwnerUsername(landlordUser.getUserName())
                .orElseGet(() -> createLandlord(landlordUser));

        Property[] properties = {
                ensureProperty(landlord, "demo-mount-pleasant-room",
                        "Sunny Room near University of Zimbabwe", "Mount Pleasant, Harare",
                        "University of Zimbabwe", "Room", "320.00", "40.00", "1 km"),
                ensureProperty(landlord, "demo-belvedere-apartment",
                        "Belvedere Student Apartment", "Belvedere, Harare",
                        "University of Zimbabwe", "Apartment", "480.00", "60.00", "3 km"),
                ensureProperty(landlord, "demo-avondale-shared-home",
                        "Avondale Shared Student Home", "Avondale, Harare",
                        "University of Zimbabwe", "Shared House", "260.00", "30.00", "5 km")
        };
        ensureStudentActivity(student, properties[0]);
    }

    private User ensureUser(String username, String email, String password, AppRole appRole) {
        var existing = userRepository.findByUserName(username);
        if (existing.isPresent()) {
            User user = existing.get();
            if (!email.equals(user.getEmail()) || user.getRole() == null || user.getRole().getRoleName() != appRole) {
                throw new IllegalStateException("A non-demo account conflicts with demo username " + username);
            }
            return user;
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalStateException("Demo email is already used by a different account: " + email);
        }
        Role role = roleRepository.findByRoleName(appRole)
                .orElseGet(() -> roleRepository.save(new Role(appRole)));
        User user = new User(username, email, passwordEncoder.encode(password));
        user.setRole(role);
        user.setAccountStatus(AccountStatus.VERIFIED);
        user.setEnabled(true);
        return userRepository.save(user);
    }

    private Student createStudent(User user) {
        Student student = new Student();
        student.setStudentName("Demo Student");
        student.setStudentNumber("DEMO-STUDENT-001");
        student.setStudentContact(new BigInteger("263770000001"));
        student.setAddress("Demo address, Harare");
        student.setOwnerUsername(user.getUserName());
        student.setUser(user);
        return studentRepository.save(student);
    }

    private Landlord createLandlord(User user) {
        Landlord landlord = new Landlord();
        landlord.setName("Demo Landlord");
        landlord.setContact(new BigInteger("263770000002"));
        landlord.setOwnerUsername(user.getUserName());
        landlord.setAddress("Demo address, Harare");
        landlord.setUser(user);
        return landlordRepository.save(landlord);
    }

    private Property ensureProperty(Landlord landlord, String slug, String name, String location,
                                    String university, String type, String price, String deposit, String distance) {
        var existing = propertyRepository.findBySlug(slug);
        if (existing.isPresent()) {
            if (!existing.get().getLandlord().getId().equals(landlord.getId())) {
                throw new IllegalStateException("A non-demo listing conflicts with demo slug " + slug);
            }
            return existing.get();
        }
        Property property = new Property();
        property.setLandlord(landlord);
        property.setName(name);
        property.setAddress(location);
        property.setDescription("Sample CampusKey listing for testing student accommodation workflows. "
                + "This is fictional demo data and is not a real rental offer.");
        property.setLocation(location);
        property.setUniversity(university);
        property.setPropertyType(type);
        property.setPrice(new BigDecimal(price));
        property.setPropertyDeposit(new BigDecimal(deposit));
        property.setDistanceFromCampus(distance);
        property.setSlug(slug);
        property.setStudentsPerRoom(List.of(1, 2));
        property.setRating(4.5);
        property.setReviewCount(2);
        property.setViews(12L);

        PropertyVerification verification = new PropertyVerification(property);
        verification.setStatus(PropertyStatus.APPROVED);
        verification.setInspector("CampusKey demo");
        verification.setSubmittedAt(LocalDateTime.now());
        verification.setVerifiedAt(LocalDateTime.now());
        verification.setNotes("Synthetic demo listing; not a real property.");
        property.setVerification(verification);
        return propertyRepository.save(property);
    }

    private void ensureStudentActivity(Student student, Property property) {
        if (bookingRepository.findAllByStudentOrderByCreatedAtDesc(student).stream()
                .noneMatch(booking -> booking.getProperty().getId().equals(property.getId()))) {
            Booking booking = new Booking(student, property, LocalDate.now().plusDays(14),
                    LocalDate.now().plusMonths(6), "Demo booking request.");
            booking.setStatus(BookingStatus.PENDING);
            bookingRepository.save(booking);
        }
        if (inquiryRepository.findAllByStudentOrderByCreatedAtDesc(student).stream()
                .noneMatch(inquiry -> inquiry.getProperty().getId().equals(property.getId()))) {
            Inquiry inquiry = new Inquiry(student, property, "Is this demo room still available?");
            inquiry.setResponse("This is a sample response from the demo landlord.");
            inquiry.setStatus(InquiryStatus.RESPONDED);
            inquiryRepository.save(inquiry);
        }
        if (favoriteRepository.findByStudentAndProperty_Id(student, property.getId()).isEmpty()) {
            favoriteRepository.save(new StudentFavorite(student, property));
        }
    }
}
