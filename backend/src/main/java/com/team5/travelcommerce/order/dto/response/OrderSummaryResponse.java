package com.team5.travelcommerce.order.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummaryResponse {
    private Long orderId;
    private String productTitle;
    private String useDate;
    private Integer totalPrice;
}