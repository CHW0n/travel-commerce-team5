package com.team5.travelcommerce.admin.controller;

import com.team5.travelcommerce.admin.dto.response.AdminUserResponse;
import com.team5.travelcommerce.admin.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponse>> getUserList(HttpSession session) {
        if (session.getAttribute("LOGIN_USER_ID") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Object role = session.getAttribute("LOGIN_USER_ROLE");
        if (role == null || !"ADMIN".equals(role.toString())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        List<AdminUserResponse> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
