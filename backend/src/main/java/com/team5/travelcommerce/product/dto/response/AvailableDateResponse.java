package com.team5.travelcommerce.product.dto.response;

import com.team5.travelcommerce.product.entity.ProductDate;
import java.time.LocalDate;

public record AvailableDateResponse(
        Long productDateId,
        LocalDate availableDate,
        String status
) {

    public static AvailableDateResponse from(ProductDate productDate) {
        return new AvailableDateResponse(
                productDate.getId(),
                productDate.getAvailableDate(),
                productDate.getStatus().name()
        );
    }
}
