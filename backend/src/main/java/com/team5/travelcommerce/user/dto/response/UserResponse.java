package com.team5.travelcommerce.user.dto.response;

import com.team5.travelcommerce.user.domain.UserRole;
import com.team5.travelcommerce.user.domain.UserStatus;

public record UserResponse(
        Long userId,
        String email,
        String name,
        String nickname,
        String phone,
        UserRole role,
        UserStatus status
) {
}
