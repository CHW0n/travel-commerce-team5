package com.team5.travelcommerce.product.dto.response;

import com.team5.travelcommerce.product.entity.Region;

public record RegionResponse(
        Long regionId,
        String regionName,
        Integer displayOrder
) {

    public static RegionResponse from(Region region) {
        return new RegionResponse(
                region.getId(),
                region.getRegionName(),
                region.getDisplayOrder()
        );
    }
}
