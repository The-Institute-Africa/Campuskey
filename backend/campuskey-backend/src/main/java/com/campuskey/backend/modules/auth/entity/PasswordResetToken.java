package com.campuskey.backend.modules.auth.entity;

import com.campuskey.backend.modules.users.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "password_reset_tokens", indexes = {
		@Index(name = "idx_password_reset_user_created", columnList = "user_id, created_at"),
		@Index(name = "idx_password_reset_user_used_exp", columnList = "user_id, used_at, expires_at")
})
public class PasswordResetToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "token_hash", nullable = false, unique = true, length = 64)
	private String tokenHash;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	@Column(name = "created_at", nullable = false)
	private Instant createdAt;

	@Column(name = "expires_at", nullable = false)
	private Instant expiresAt;

	@Column(name = "used_at")
	private Instant usedAt;

	public PasswordResetToken() {
	}

	public PasswordResetToken(String tokenHash, User user, Instant createdAt, Instant expiresAt) {
		this.tokenHash = tokenHash;
		this.user = user;
		this.createdAt = createdAt;
		this.expiresAt = expiresAt;
	}

	public Long getId() {
		return id;
	}

	public String getTokenHash() {
		return tokenHash;
	}

	public User getUser() {
		return user;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public Instant getExpiresAt() {
		return expiresAt;
	}

	public Instant getUsedAt() {
		return usedAt;
	}

	public boolean isExpired(Instant now) {
		return expiresAt.isBefore(now);
	}

	public boolean isUsed() {
		return usedAt != null;
	}

	public void markUsed(Instant usedAt) {
		this.usedAt = usedAt;
	}
}

