package com.team5.travelcommerce.product.dto.response;

import java.util.List;

public record ProductPageResponse(
        List<ProductSummaryResponse> content,
        Integer page,
        Integer size,
        Long totalElements,
        Integer totalPages
) {

    public List<ProductSummaryResponse> getProducts() {
        return content;
    }

    public Long getTotalCount() {
        return totalElements;
    }
}
