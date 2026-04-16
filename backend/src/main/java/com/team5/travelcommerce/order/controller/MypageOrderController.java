package com.team5.travelcommerce.order.controller;

import com.team5.travelcommerce.order.service.MypageOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/my-orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MypageOrderController {

    private final MypageOrderService mypageOrderService;

    @GetMapping("/list")
    public List<Map<String, Object>> getMyOrderList() {
        return mypageOrderService.getMyOrders();
    }
}