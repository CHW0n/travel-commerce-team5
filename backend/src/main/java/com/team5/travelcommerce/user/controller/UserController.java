package com.team5.travelcommerce.user.controller;

import com.team5.travelcommerce.user.dto.request.LoginRequest;
import com.team5.travelcommerce.user.dto.request.SignupRequest;
import com.team5.travelcommerce.user.dto.response.UserResponse;
import com.team5.travelcommerce.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody SignupRequest request) {
        UserResponse response = userService.signup(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @Valid @RequestBody LoginRequest request,
            HttpSession session
    ) {
        UserResponse userResponse = userService.login(request);

        session.setAttribute("LOGIN_USER_ID", userResponse.userId());
        session.setAttribute("LOGIN_USER_ROLE", userResponse.role());

        return ResponseEntity.ok(Map.of(
                "message", "로그인이 완료되었습니다.",
                "user", userResponse
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();

        return ResponseEntity.ok(Map.of(
                "message", "로그아웃이 완료되었습니다."
        ));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
        boolean available = userService.checkEmailAvailable(email);

        return ResponseEntity.ok(Map.of(
                "email", email,
                "available", available
        ));
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Map<String, Object>> checkNickname(@RequestParam String nickname) {
        boolean available = userService.checkNicknameAvailable(nickname);

        return ResponseEntity.ok(Map.of(
                "nickname", nickname,
                "available", available
        ));
    }
}