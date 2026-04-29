package com.team5.travelcommerce.order.controller;

import com.team5.travelcommerce.order.dto.request.CreateOrderRequest;
import com.team5.travelcommerce.order.dto.response.OrderResponse;
import com.team5.travelcommerce.order.dto.response.OrderSummaryResponse;
import com.team5.travelcommerce.order.service.OrderService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    private Long getLoginUserId(HttpSession session) {
        Object loginUserId = session.getAttribute("LOGIN_USER_ID");

        if (loginUserId == null) {
            return null;
        }

        if (loginUserId instanceof Long) {
            return (Long) loginUserId;
        }

        if (loginUserId instanceof Integer) {
            return ((Integer) loginUserId).longValue();
        }

        return Long.valueOf(loginUserId.toString());
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody CreateOrderRequest request,
            HttpSession session
    ) {
        Long userId = getLoginUserId(session);

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        OrderResponse response = orderService.createOrder(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderSummaryResponse>> getMyOrders(HttpSession session) {
        Long userId = getLoginUserId(session);

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<OrderResponse> orders = orderService.getOrderList(userId);

        List<OrderSummaryResponse> responses = orders.stream()
                .map(order -> OrderSummaryResponse.builder()
                        .orderId(Long.parseLong(order.getId()))
                        .productTitle(order.getTitle())
                        .useDate(order.getDateText())
                        .people(order.getPeople())
                        .totalPrice((long) order.getTotalPrice())
                        .productImageUrl(order.getProductImageUrl())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/count")
    public long countOrders() {
        return orderService.countOrders();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderDetail(
            @PathVariable Long orderId,
            HttpSession session
    ) {
        Long userId = getLoginUserId(session);

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        OrderResponse response = orderService.getOrderDetail(userId, orderId);
        return ResponseEntity.ok(response);
    }
}
