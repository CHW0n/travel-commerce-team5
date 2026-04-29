package com.team5.travelcommerce.order.dto.response;

import lombok.Builder;

@Builder
public record OrderSummaryResponse(
        Long orderId,
        String productTitle,
        String useDate,
        Long totalPrice // 타입 충돌 방지를 위해 Long으로 유지합니다.
) {
}