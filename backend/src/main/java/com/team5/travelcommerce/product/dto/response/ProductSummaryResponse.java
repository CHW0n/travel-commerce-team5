package com.team5.travelcommerce.product.dto.response;

import com.team5.travelcommerce.product.entity.Product;

public record ProductSummaryResponse(
        Long productId,
        String title,
        String imageUrl,
        String address,
        Integer pricePerPerson
) {

    public static ProductSummaryResponse from(Product product) {
        return new ProductSummaryResponse(
                product.getId(),
                product.getTitle(),
                product.getImageUrl(),
                product.getAddress(),
                product.getPricePerPerson()
        );
    }
}
