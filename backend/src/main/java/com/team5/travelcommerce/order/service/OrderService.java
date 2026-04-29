package com.team5.travelcommerce.order.service;

import com.team5.travelcommerce.order.dto.request.CreateOrderRequest;
import com.team5.travelcommerce.order.dto.response.OrderResponse;
import com.team5.travelcommerce.order.entity.Order;
import com.team5.travelcommerce.order.domain.OrderStatus;
import com.team5.travelcommerce.order.repository.OrderRepository;
import com.team5.travelcommerce.product.entity.Product;
import com.team5.travelcommerce.product.entity.ProductDate;
import com.team5.travelcommerce.user.entity.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final EntityManager entityManager;

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        // 1. DB에 실제 존재하는 데이터들과 연결 (ID가 다르면 에러나니 주의!)
        Product product = entityManager.getReference(Product.class, request.getProductId());

        // ProductDate ID가 1번이 맞는지 확인하세요! 만약 다르면 디비버에서 확인 후 수정해야 합니다.
        ProductDate productDate = entityManager.getReference(ProductDate.class, 1L);

        // 다은 님이 확인해주신 유저 ID 999번 적용!
        User user = entityManager.getReference(User.class, 999L);

        // 2. 주문 엔티티 조립
        Order order = Order.builder()
                .user(user)
                .product(product)
                .productDate(productDate)
                .externalProductId(String.valueOf(request.getProductId()))
                .productTitleSnapshot(request.getTitle())
                .productImageSnapshot(request.getProductImageUrl())
                .useDate(LocalDate.parse(request.getDateText()))
                .people(request.getPeople())
                .unitPrice(request.getUnitPrice())
                .totalPrice(request.getTotalPrice())
                .travelerFirstName(request.getTravelerFirstName())
                .travelerLastName(request.getTravelerLastName())
                .travelerPhone(request.getTravelerPhone())
                .travelerEmail(request.getTravelerEmail())
                .orderStatus(OrderStatus.COMPLETED)
                .orderedAt(LocalDateTime.now()) // 혹시 모를 null 에러 방지를 위해 직접 넣어줌
                .build();

        // 3. 저장 및 응답 반환
        Order savedOrder = orderRepository.save(order);
        return OrderResponse.from(savedOrder);
    }

    public OrderResponse getOrderDetail(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문을 찾을 수 없습니다."));
        return OrderResponse.from(order);
    }

    public List<OrderResponse> getOrderList() {
        return orderRepository.findAll().stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    public long countOrders() {
        return orderRepository.count();
    }
}