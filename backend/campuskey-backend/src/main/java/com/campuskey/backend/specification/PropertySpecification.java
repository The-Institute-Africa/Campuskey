package com.campuskey.backend.specification;

import com.campuskey.backend.entities.Property;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PropertySpecification {
    public static Specification<Property> search(String location, BigDecimal price, String university) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (location != null && !location.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("address")), "%" + location.toLowerCase() + "%"));
            }
            if (price != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), price));
            }
            if (university != null && !university.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("university")), "%" + university.toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
