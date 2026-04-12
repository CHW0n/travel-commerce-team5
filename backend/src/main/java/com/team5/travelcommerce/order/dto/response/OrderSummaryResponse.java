package com.team5.travelcommerce.order.dto.response;

public record OrderSummaryResponse(
        Long orderId,
        String productTitle,
        String useDate,
        Integer totalPrice
) {
}
