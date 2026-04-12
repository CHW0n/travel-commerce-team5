package com.team5.travelcommerce.order.entity;

import com.team5.travelcommerce.order.domain.OrderStatus;
import com.team5.travelcommerce.product.entity.Product;
import com.team5.travelcommerce.product.entity.ProductDate;
import com.team5.travelcommerce.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_date_id", nullable = false)
    private ProductDate productDate;

    @Column(name = "external_product_id", nullable = false)
    private String externalProductId;

    @Column(name = "product_title_snapshot", nullable = false)
    private String productTitleSnapshot;

    @Column(name = "product_image_snapshot")
    private String productImageSnapshot;

    @Column(name = "use_date", nullable = false)
    private LocalDate useDate;

    @Column(nullable = false)
    private Integer people;

    @Column(name = "unit_price", nullable = false)
    private Integer unitPrice;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @Column(name = "traveler_last_name", nullable = false)
    private String travelerLastName;

    @Column(name = "traveler_first_name", nullable = false)
    private String travelerFirstName;

    @Column(name = "traveler_phone", nullable = false)
    private String travelerPhone;

    @Column(name = "traveler_email", nullable = false)
    private String travelerEmail;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status", nullable = false)
    private OrderStatus orderStatus;

    @Column(name = "ordered_at", nullable = false)
    private LocalDateTime orderedAt;
}
