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
    public OrderResponse createOrder(Long userId, CreateOrderRequest request) {
        Product product = entityManager.getReference(Product.class, request.getProductId());

        // 지금은 임시로 1L을 쓰고 있지만, 가능하면 request에서 productDateId를 받아 쓰는 게 좋습니다.
        ProductDate productDate = entityManager.getReference(ProductDate.class, 1L);

        User user = entityManager.getReference(User.class, userId);

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
                .orderedAt(LocalDateTime.now())
                .build();

        Order savedOrder = orderRepository.save(order);
        return OrderResponse.from(savedOrder);
    }

    public OrderResponse getOrderDetail(Long userId, Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("주문을 찾을 수 없습니다."));

        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("해당 주문에 접근할 권한이 없습니다.");
        }

        return OrderResponse.from(order);
    }

    public List<OrderResponse> getOrderList(Long userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    public long countOrders() {
        return orderRepository.count();
    }
}
