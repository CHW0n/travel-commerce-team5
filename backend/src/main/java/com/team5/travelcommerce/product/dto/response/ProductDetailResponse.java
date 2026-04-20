package com.team5.travelcommerce.product.dto.response;

import com.team5.travelcommerce.product.entity.Product;
import java.util.List;

public record ProductDetailResponse(
        Long productId,
        String externalProductId,
        Long regionId,
        String regionName,
        String title,
        String imageUrl,
        String address,
        Double satisfaction,
        Integer reviewCount,
        Integer bookings,
        String duration,
        Integer pricePerPerson,
        List<String> languages,
        List<String> itinerary,
        List<AvailableDateResponse> availableDates
) {

    public static ProductDetailResponse from(
            Product product,
            List<String> languages,
            List<String> itinerary,
            List<AvailableDateResponse> availableDates
    ) {
        return new ProductDetailResponse(
                product.getId(),
                product.getExternalProductId(),
                product.getRegion().getId(),
                product.getRegion().getRegionName(),
                product.getTitle(),
                product.getImageUrl(),
                product.getAddress(),
                product.getSatisfaction(),
                product.getReviewCount(),
                product.getBookings(),
                product.getDuration(),
                product.getPricePerPerson(),
                languages,
                itinerary,
                availableDates
        );
    }
}
