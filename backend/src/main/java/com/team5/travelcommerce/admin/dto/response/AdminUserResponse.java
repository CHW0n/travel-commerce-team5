package com.team5.travelcommerce.admin.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {
    private Long userId;     // 사용자 식별자 [cite: 96, 99]
    private String email;    // 이메일 [cite: 48, 99]
    private String nickname; // 닉네임 [cite: 97, 99]
    private String role;     // 권한 (ADMIN, USER) [cite: 25, 26]
    private String status;   // 상태 (ACTIVE, WITHDRAWN) [cite: 27, 28, 98]
}