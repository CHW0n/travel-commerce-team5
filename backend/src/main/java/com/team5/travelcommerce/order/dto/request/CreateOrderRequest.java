package com.team5.travelcommerce.order.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateOrderRequest(
        @NotNull Long productId,
        @NotNull Long productDateId,
        @NotNull Integer people,
        @NotBlank String travelerLastName,
        @NotBlank String travelerFirstName,
        @NotBlank String travelerPhone,
        @NotBlank String travelerEmail
) {
}
