package com.team5.travelcommerce.order.dto.response;

import lombok.Builder;

@Builder
public record OrderSummaryResponse(
        Long orderId,
        String productTitle,
        String useDate,
        Long totalPrice // Integer에서 Long으로 수정하여 타입 충돌 해결
) {
}