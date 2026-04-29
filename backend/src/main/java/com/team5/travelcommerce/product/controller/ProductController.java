package com.team5.travelcommerce.product.controller;

import com.team5.travelcommerce.product.dto.response.ProductDetailResponse;
import com.team5.travelcommerce.product.dto.response.ProductPageResponse;
import com.team5.travelcommerce.product.service.ProductService;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ProductPageResponse getProducts(
            @RequestParam(required = false) String region,
            @RequestParam(required = false) LocalDate date,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(required = false) Integer size,
            @RequestParam(required = false, name = "perPage") Integer perPage
    ) {
        return productService.getProducts(region, date, page, size, perPage);
    }

    @GetMapping("/{productId}")
    public ProductDetailResponse getProductDetail(@PathVariable Long productId) {
        return productService.getProductDetail(productId);
    }
}
