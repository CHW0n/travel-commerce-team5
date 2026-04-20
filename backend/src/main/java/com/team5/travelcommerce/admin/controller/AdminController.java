package com.team5.travelcommerce.admin.controller;

import com.team5.travelcommerce.admin.service.AdminService;
import com.team5.travelcommerce.admin.dto.response.AdminUserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final AdminService adminService;

    // 관리자 회원 목록 조회 (이것만 남기기!)
    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
}