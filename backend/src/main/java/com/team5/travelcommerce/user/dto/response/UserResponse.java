package com.team5.travelcommerce.user.dto.response;

import com.team5.travelcommerce.user.domain.UserRole;
import com.team5.travelcommerce.user.domain.UserStatus;
import com.team5.travelcommerce.user.entity.User;

public record UserResponse(
        Long userId,
        String email,
        String name,
        String nickname,
        UserRole role,
        UserStatus status
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getNickname(),
                user.getRole(),
                user.getStatus()
        );
    }
}
