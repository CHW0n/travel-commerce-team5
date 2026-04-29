package com.team5.travelcommerce.order.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {
    private Long productId;
    private Long productDateId;
    private String title;
    private String dateText;
    private String productImageUrl;
    private int people;
    private int unitPrice;
    private int totalPrice;
    private String travelerFirstName;
    private String travelerLastName;
    private String travelerPhone;
    private String travelerEmail;
}
