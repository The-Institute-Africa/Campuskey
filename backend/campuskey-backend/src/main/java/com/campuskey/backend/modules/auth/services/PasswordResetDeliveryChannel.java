package com.campuskey.backend.modules.auth.services;

import com.campuskey.backend.modules.users.entity.User;

public interface PasswordResetDeliveryChannel {

    void deliverResetToken(User user, String rawToken, int validityMinutes);
}

