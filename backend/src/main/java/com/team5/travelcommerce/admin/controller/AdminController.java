package com.team5.travelcommerce.admin.controller;

import com.team5.travelcommerce.admin.service.AdminService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // 모든 프론트엔드 접속 허용 (테스트용 필수!)
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public List<Map<String, Object>> getUserList() {
        return adminService.getAllUsers();
    }
}