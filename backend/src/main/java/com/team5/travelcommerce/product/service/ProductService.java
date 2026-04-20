package com.team5.travelcommerce.product.service;

import com.team5.travelcommerce.product.domain.ProductStatus;
import com.team5.travelcommerce.product.domain.RegionStatus;
import com.team5.travelcommerce.product.dto.response.AvailableDateResponse;
import com.team5.travelcommerce.product.dto.response.ProductDetailResponse;
import com.team5.travelcommerce.product.dto.response.ProductPageResponse;
import com.team5.travelcommerce.product.dto.response.ProductSummaryResponse;
import com.team5.travelcommerce.product.entity.Product;
import com.team5.travelcommerce.product.entity.Region;
import com.team5.travelcommerce.product.repository.ProductDateRepository;
import com.team5.travelcommerce.product.repository.ProductRepository;
import com.team5.travelcommerce.product.repository.RegionRepository;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductDateRepository productDateRepository;
    private final RegionRepository regionRepository;

    public ProductPageResponse getProducts(
            String region,
            LocalDate date,
            Integer page,
            Integer size,
            Integer perPage
    ) {
        int validatedPage = validatePage(page);
        int validatedSize = validateSize(size, perPage);
        String regionName = resolveRegionName(region);
        Page<Product> productPage = date != null
                ? productRepository.findAvailableProducts(
                        regionName,
                        date,
                        ProductStatus.ACTIVE,
                        RegionStatus.ACTIVE,
                        PageRequest.of(validatedPage - 1, validatedSize)
                )
                : productRepository.findBrowsableProducts(
                        regionName,
                        ProductStatus.ACTIVE,
                        RegionStatus.ACTIVE,
                        PageRequest.of(validatedPage - 1, validatedSize)
                );

        return new ProductPageResponse(
                productPage.getContent().stream()
                        .map(ProductSummaryResponse::from)
                        .toList(),
                validatedPage,
                validatedSize,
                productPage.getTotalElements(),
                productPage.getTotalPages()
        );
    }

    public ProductDetailResponse getProductDetail(Long productId) {
        Product product = productRepository.findActiveProductDetail(
                        productId,
                        ProductStatus.ACTIVE,
                        RegionStatus.ACTIVE
                )
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "상품 정보를 찾을 수 없습니다."));

        List<AvailableDateResponse> availableDates = productDateRepository
                .findAllByProductIdOrderByAvailableDateAsc(productId)
                .stream()
                .map(AvailableDateResponse::from)
                .toList();

        return ProductDetailResponse.from(
                product,
                readJsonArray(product.getLanguages()),
                readJsonArray(product.getItinerary()),
                availableDates
        );
    }

    private int validatePage(Integer page) {
        if (page == null || page < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "page는 1 이상이어야 합니다.");
        }
        return page;
    }

    private int validateSize(Integer size, Integer perPage) {
        int resolvedSize = size != null ? size : (perPage != null ? perPage : 16);
        if (resolvedSize < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "size는 1 이상이어야 합니다.");
        }
        return resolvedSize;
    }

    private String resolveRegionName(String region) {
        if (region == null || region.isBlank()) {
            return null;
        }

        String normalized = region.trim().toLowerCase();
        return switch (normalized) {
            case "seoul", "서울" -> "서울";
            case "busan", "부산" -> "부산";
            case "jeju", "제주" -> "제주";
            case "gangneung", "강릉" -> "강릉";
            default -> findRegionNameFromActiveRegions(region.trim());
        };
    }

    private String findRegionNameFromActiveRegions(String region) {
        return regionRepository.findAllByStatus(RegionStatus.ACTIVE).stream()
                .map(Region::getRegionName)
                .filter(regionName -> regionName.equalsIgnoreCase(region))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "유효하지 않은 region 값입니다."));
    }

    private List<String> readJsonArray(String value) {
        if (value == null || value.isBlank()) {
            return Collections.emptyList();
        }

        String trimmed = value.trim();
        if (trimmed.startsWith("\"") && trimmed.endsWith("\"")) {
            trimmed = trimmed.substring(1, trimmed.length() - 1)
                    .replace("\\\"", "\"");
        }

        if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "상품 상세 데이터 파싱에 실패했습니다.");
        }

        String body = trimmed.substring(1, trimmed.length() - 1).trim();
        if (body.isEmpty()) {
            return Collections.emptyList();
        }

        return Arrays.stream(body.split("\\s*,\\s*"))
                .map(item -> item.replaceAll("^\"|\"$", ""))
                .map(String::trim)
                .filter(item -> !item.isBlank())
                .collect(Collectors.toList());
    }
}
