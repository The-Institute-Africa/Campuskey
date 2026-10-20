CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    message VARCHAR(1000),
    status VARCHAR(20) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_booking_student_created (student_id, created_at),
    INDEX idx_booking_property_status (property_id, status),
    CONSTRAINT fk_booking_student FOREIGN KEY (student_id) REFERENCES student (id),
    CONSTRAINT fk_booking_property FOREIGN KEY (property_id) REFERENCES property (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS inquiries (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    message VARCHAR(2000) NOT NULL,
    response VARCHAR(2000),
    status VARCHAR(20) NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_inquiry_student_created (student_id, created_at),
    INDEX idx_inquiry_property_status (property_id, status),
    CONSTRAINT fk_inquiry_student FOREIGN KEY (student_id) REFERENCES student (id),
    CONSTRAINT fk_inquiry_property FOREIGN KEY (property_id) REFERENCES property (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS student_favorites (
    id BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_student_favorite_property UNIQUE (student_id, property_id),
    CONSTRAINT fk_student_favorite_student FOREIGN KEY (student_id) REFERENCES student (id),
    CONSTRAINT fk_student_favorite_property FOREIGN KEY (property_id) REFERENCES property (id)
) ENGINE=InnoDB;
