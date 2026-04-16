package com.campuskey.backend.modules.auth.repository;

import com.campuskey.backend.modules.auth.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

	Optional<PasswordResetToken> findByTokenHashAndUsedAtIsNullAndExpiresAtAfter(String tokenHash, Instant now);

	long deleteByUserUserId(Long userId);

	long deleteByExpiresAtBefore(Instant now);

	long deleteByUsedAtIsNotNull();

	long countByUserUserIdAndCreatedAtAfter(Long userId, Instant since);

	long countByUserUserIdAndUsedAtIsNullAndExpiresAtAfter(Long userId, Instant now);

	Optional<PasswordResetToken> findTopByUserUserIdOrderByCreatedAtDesc(Long userId);
}

