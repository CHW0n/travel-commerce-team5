package com.team5.travelcommerce.user.dto.request;

import jakarta.validation.constraints.NotBlank;

public record VerifyPasswordRequest(
        @NotBlank String password
) {
}
