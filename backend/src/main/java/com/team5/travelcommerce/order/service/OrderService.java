package com.team5.travelcommerce.order.service;

import com.team5.travelcommerce.order.dto.response.OrderResponse;
import com.team5.travelcommerce.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;


    public long countOrders() {
        return orderRepository.count();
    }


    public List<OrderResponse> getOrderList() {
        return orderRepository.findAll().stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }
}