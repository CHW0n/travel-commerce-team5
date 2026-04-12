package com.team5.travelcommerce.admin.dto.response;

public record AdminUserResponse(
        Long userId,
        String email,
        String nickname,
        String role,
        String status
) {
}
