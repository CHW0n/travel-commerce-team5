package com.team5.travelcommerce.order.dto.response;

import com.team5.travelcommerce.order.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private String id;
    private String title;
    private String dateText;
    private int people;
    private int totalPrice;
    private String productImageUrl;
    public static OrderResponse from(Order order) {
        return OrderResponse.builder()
                .id(order.getId().toString())
                .title(order.getProductTitleSnapshot())
                .dateText(order.getUseDate().toString())
                .people(order.getPeople())
                .totalPrice(order.getTotalPrice())
                .productImageUrl(order.getProductImageSnapshot())
                .build();
    }
}