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
    private Long productId;
    private Long productDateId;

    private String title;
    private String dateText;
    private int people;
    private int unitPrice;
    private int totalPrice;
    private String productImageUrl;

    private String travelerFirstName;
    private String travelerLastName;
    private String travelerPhone;
    private String travelerEmail;

    private String orderStatus;
    private String createdAt;

    public static OrderResponse from(Order order) {
        return OrderResponse.builder()
                .id(order.getId().toString())
                .productId(order.getProduct().getId())
                .productDateId(order.getProductDate().getId())
                .title(order.getProductTitleSnapshot())
                .dateText(order.getUseDate().toString())
                .people(order.getPeople())
                .unitPrice(order.getUnitPrice())
                .totalPrice(order.getTotalPrice())
                .productImageUrl(order.getProductImageSnapshot())
                .travelerFirstName(order.getTravelerFirstName())
                .travelerLastName(order.getTravelerLastName())
                .travelerPhone(order.getTravelerPhone())
                .travelerEmail(order.getTravelerEmail())
                .orderStatus(order.getOrderStatus().name())
                .createdAt(order.getOrderedAt().toString())
                .build();
    }
}
