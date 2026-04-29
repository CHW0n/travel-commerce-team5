package com.team5.travelcommerce.user.controller;

import com.team5.travelcommerce.global.BusinessException;
import com.team5.travelcommerce.global.ErrorCode;
import com.team5.travelcommerce.user.dto.request.ChangePasswordRequest;
import com.team5.travelcommerce.user.dto.request.LoginRequest;
import com.team5.travelcommerce.user.dto.request.SignupRequest;
import com.team5.travelcommerce.user.dto.request.VerifyPasswordRequest;
import com.team5.travelcommerce.user.dto.response.MessageResponse;
import com.team5.travelcommerce.user.dto.response.UserResponse;
import com.team5.travelcommerce.user.dto.response.VerifyPasswordResponse;
import com.team5.travelcommerce.user.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(@Valid @RequestBody SignupRequest request) {
        UserResponse response = userService.signup(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // 로그인
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

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpSession session) {
        session.invalidate();

        return ResponseEntity.ok(Map.of(
                "message", "로그아웃이 완료되었습니다."
        ));
    }

    // 이메일 중복 확인
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Object>> checkEmail(@RequestParam String email) {
        boolean available = userService.checkEmailAvailable(email);

        return ResponseEntity.ok(Map.of(
                "email", email,
                "available", available
        ));
    }

    // 닉네임 중복 확인
    @GetMapping("/check-nickname")
    public ResponseEntity<Map<String, Object>> checkNickname(@RequestParam String nickname) {
        boolean available = userService.checkNicknameAvailable(nickname);

        return ResponseEntity.ok(Map.of(
                "nickname", nickname,
                "available", available
        ));
    }

    // 회원 정보 조회
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(HttpSession session) {
        Long userId = getLoginUserId(session);
        return ResponseEntity.ok(userService.getUser(userId));
    }

    // 현재 비밀번호 확인
    @PostMapping("/verify-password")
    public ResponseEntity<VerifyPasswordResponse> verifyPassword(
            HttpSession session,
            @Valid @RequestBody VerifyPasswordRequest request
    ) {
        Long userId = getLoginUserId(session);
        boolean matched = userService.verifyPassword(userId, request.password());
        return ResponseEntity.ok(new VerifyPasswordResponse(matched));
    }

    // 비밀번호 변경
    @PatchMapping("/password")
    public ResponseEntity<MessageResponse> changePassword(
            HttpSession session,
            @Valid @RequestBody ChangePasswordRequest request
    ) {
        Long userId = getLoginUserId(session);
        userService.changePassword(userId, request.currentPassword(), request.newPassword());
        return ResponseEntity.ok(new MessageResponse("비밀번호가 변경되었습니다."));
    }

    // 회원 탈퇴
    @PatchMapping("/withdraw")
    public ResponseEntity<MessageResponse> withdraw(HttpSession session) {
        Long userId = getLoginUserId(session);
        userService.withdraw(userId);
        session.invalidate();
        return ResponseEntity.ok(new MessageResponse("회원 탈퇴가 완료되었습니다."));
    }

    private Long getLoginUserId(HttpSession session) {
        Long userId = (Long) session.getAttribute("LOGIN_USER_ID");
        if (userId == null) throw new BusinessException(ErrorCode.UNAUTHORIZED);
        return userId;
    }
}
