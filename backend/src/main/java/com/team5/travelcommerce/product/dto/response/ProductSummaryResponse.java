package com.team5.travelcommerce.product.dto.response;

public record ProductSummaryResponse(
        Long productId,
        String title,
        String imageUrl,
        String address,
        Integer pricePerPerson
) {
}
