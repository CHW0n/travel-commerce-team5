package com.team5.travelcommerce.order.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import static java.util.Map.entry;

@Service
public class MypageOrderService {

    public List<Map<String, Object>> getMyOrders() {
        return List.of(
                Map.ofEntries(
                        entry("id", 1),
                        entry("title", "경복궁"),
                        entry("date", "2월 20일 (화)"),
                        entry("count", "2명"),
                        entry("price", "66,269원"),
                        entry("img", "/images/Product_Image.png"),
                        entry("bookerName", "김다은"),
                        entry("bookerPhone", "010-1111-2222"),
                        entry("bookerEmail", "groom@gmail.com"),
                        entry("basePrice", "32,345원"),
                        entry("payTime", "13:23 3월 20일")
                )
        );
    }
}