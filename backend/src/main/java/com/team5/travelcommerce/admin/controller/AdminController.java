package com.team5.travelcommerce.admin.controller;

import com.team5.travelcommerce.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor // 생성자 주입을 자동으로 해줍니다.
public class AdminController {

    private final AdminService adminService;

    // 관리자 회원 목록 조회
    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUserList() {
        List<Map<String, Object>> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}