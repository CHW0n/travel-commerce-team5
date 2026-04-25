package com.team5.travelcommerce.product.controller;

import com.team5.travelcommerce.product.dto.response.RegionResponse;
import com.team5.travelcommerce.product.service.RegionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
public class RegionController {

    private final RegionService regionService;

    @GetMapping
    public List<RegionResponse> getRegions() {
        return regionService.getActiveRegions();
    }
}
