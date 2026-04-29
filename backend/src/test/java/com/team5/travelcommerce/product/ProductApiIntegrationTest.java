package com.team5.travelcommerce.product;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
class ProductApiIntegrationTest {

    private MockMvc mockMvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        jdbcTemplate.update("DELETE FROM product_dates");
        jdbcTemplate.update("DELETE FROM products");
        jdbcTemplate.update("DELETE FROM regions");

        jdbcTemplate.update("""
                INSERT INTO regions (region_id, region_name, display_order, status)
                VALUES (1, '서울', 1, 'ACTIVE'),
                       (2, '부산', 2, 'ACTIVE'),
                       (3, '숨김지역', 3, 'INACTIVE')
                """);

        jdbcTemplate.update("""
                INSERT INTO products (
                    product_id, external_product_id, region_id, title, image_url, address,
                    satisfaction, review_count, bookings, duration, price_per_person,
                    languages, itinerary, status, created_at, updated_at
                )
                VALUES
                (
                    100, 'EXT-100', 1, '서울 야경 투어', 'https://example.com/seoul.jpg', '서울특별시 중구',
                    4.8, 128, 560, '3시간', 39000,
                    '["ko","en"]', '["남산타워 집결","명동 이동"]', 'ACTIVE', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                ),
                (
                    101, 'EXT-101', 2, '부산 바다 투어', 'https://example.com/busan.jpg', '부산광역시 수영구',
                    4.7, 90, 220, '2시간', 49000,
                    '["ko"]', '["광안리 집결"]', 'ACTIVE', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                ),
                (
                    102, 'EXT-102', 1, '비활성 상품', 'https://example.com/inactive.jpg', '서울특별시 종로구',
                    4.1, 10, 33, '1시간', 10000,
                    '["ko"]', '["테스트"]', 'INACTIVE', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                )
                """);

        jdbcTemplate.update("""
                INSERT INTO product_dates (
                    product_date_id, product_id, available_date, status, created_at, updated_at
                )
                VALUES
                (1000, 100, DATE '2026-03-24', 'OPEN', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
                (1001, 100, DATE '2026-03-25', 'OPEN', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
                (1002, 100, DATE '2026-03-26', 'CLOSED', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
                (1003, 101, DATE '2026-03-24', 'OPEN', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
                (1004, 102, DATE '2026-03-24', 'OPEN', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())
                """);
    }

    @Test
    void getRegions_returns_only_active_regions_sorted_by_display_order() throws Exception {
        mockMvc.perform(get("/api/regions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].regionId").value(1))
                .andExpect(jsonPath("$[0].regionName").value("서울"))
                .andExpect(jsonPath("$[1].regionId").value(2))
                .andExpect(jsonPath("$[1].regionName").value("부산"));
    }

    @Test
    void getProducts_filters_by_region_and_open_date_with_pagination() throws Exception {
        mockMvc.perform(get("/api/products")
                        .param("region", "seoul")
                        .param("date", "2026-03-24")
                        .param("page", "1")
                        .param("size", "16"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(1))
                .andExpect(jsonPath("$.content[0].productId").value(100))
                .andExpect(jsonPath("$.content[0].title").value("서울 야경 투어"))
                .andExpect(jsonPath("$.page").value(1))
                .andExpect(jsonPath("$.size").value(16))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    void getProducts_without_date_returns_browsable_products_with_open_dates() throws Exception {
        mockMvc.perform(get("/api/products")
                        .param("page", "1")
                        .param("size", "16"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content.length()").value(2))
                .andExpect(jsonPath("$.totalElements").value(2));
    }

    @Test
    void getProductDetail_returns_active_product_with_open_available_dates_only() throws Exception {
        mockMvc.perform(get("/api/products/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(100))
                .andExpect(jsonPath("$.regionName").value("서울"))
                .andExpect(jsonPath("$.languages.length()").value(2))
                .andExpect(jsonPath("$.itinerary.length()").value(2))
                .andExpect(jsonPath("$.availableDates.length()").value(3))
                .andExpect(jsonPath("$.availableDates[0].productDateId").value(1000))
                .andExpect(jsonPath("$.availableDates[0].status").value("OPEN"));
    }
}
