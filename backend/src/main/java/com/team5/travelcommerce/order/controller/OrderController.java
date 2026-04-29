package com.team5.travelcommerce.order.controller;

import com.team5.travelcommerce.order.dto.request.CreateOrderRequest;
import com.team5.travelcommerce.order.dto.response.OrderResponse;
import com.team5.travelcommerce.order.dto.response.OrderSummaryResponse;
import com.team5.travelcommerce.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) {
        OrderResponse response = orderService.createOrder(request);
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<List<OrderSummaryResponse>> getMyOrders() {
        List<OrderResponse> orders = orderService.getOrderList();
        List<OrderSummaryResponse> responses = orders.stream()
                .map(order -> OrderSummaryResponse.builder()
                        .orderId(Long.parseLong(order.getId()))
                        .productTitle(order.getTitle())
                        .useDate(order.getDateText())
                        .totalPrice((long) order.getTotalPrice()) // 아까 뜬 형변환 오류 해결!
                        .build())
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/count")
    public long countOrders() {
        return orderService.countOrders();
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderDetail(@PathVariable Long orderId) {
        OrderResponse response = orderService.getOrderDetail(orderId);
        return ResponseEntity.ok(response);
    }
}