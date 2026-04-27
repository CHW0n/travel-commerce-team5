package com.team5.travelcommerce.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ChangePasswordRequest(
        @NotBlank String currentPassword,
        @NotBlank @Pattern(
                regexp = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$",
                message = "비밀번호는 특수문자, 숫자가 포함된 8~32자 이내여야 합니다."
        ) String newPassword
) {
}
