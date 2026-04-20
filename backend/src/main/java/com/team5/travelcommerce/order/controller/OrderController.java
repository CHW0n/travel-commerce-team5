package com.team5.travelcommerce.order.controller;

import com.team5.travelcommerce.order.dto.response.OrderResponse;
import com.team5.travelcommerce.order.dto.response.OrderSummaryResponse;
import com.team5.travelcommerce.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/api/my-orders/count")
    public long countOrders() {
        return orderService.countOrders();
    }

    @GetMapping("/api/my-orders/list")
    public List<OrderResponse> getOrderList() {
        return orderService.getOrderList();
    }

    @GetMapping("/api/orders")
    public ResponseEntity<List<OrderSummaryResponse>> getMyOrders() {
        List<OrderResponse> orders = orderService.getOrderList();

        List<OrderSummaryResponse> responses = orders.stream()
                .map(order -> OrderSummaryResponse.builder()
                        .orderId(Long.parseLong(order.getId()))
                        .productTitle(order.getTitle())
                        .useDate(order.getDateText())
                        .totalPrice(order.getTotalPrice())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }
}