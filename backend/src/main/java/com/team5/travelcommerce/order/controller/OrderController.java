package com.team5.travelcommerce.order.controller;

import com.team5.travelcommerce.order.dto.response.OrderResponse;
import com.team5.travelcommerce.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/my-orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;


    @GetMapping("/count")
    public long countOrders() {
        return orderService.countOrders();
    }


    @GetMapping("/list")
    public List<OrderResponse> getOrderList() {
        return orderService.getOrderList();
    }
}