package com.team5.travelcommerce.order.dto.response;

import lombok.Builder;

@Builder
public record OrderSummaryResponse(
        Long orderId,
        String productTitle,
        String useDate,
        Integer people,
        Long totalPrice,
        String productImageUrl
) {
}
