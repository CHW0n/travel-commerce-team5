package com.team5.travelcommerce.user.service;

import com.team5.travelcommerce.global.BusinessException;
import com.team5.travelcommerce.global.ErrorCode;
import com.team5.travelcommerce.user.domain.UserRole;
import com.team5.travelcommerce.user.domain.UserStatus;
import com.team5.travelcommerce.user.dto.request.LoginRequest;
import com.team5.travelcommerce.user.dto.request.SignupRequest;
import com.team5.travelcommerce.user.dto.response.UserResponse;
import com.team5.travelcommerce.user.entity.User;
import com.team5.travelcommerce.user.repository.UserRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 회원가입
    @Transactional
    public UserResponse signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        if (userRepository.existsByNickname(request.nickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        User user = User.builder()
                .email(request.email())
                .passwordHash(passwordEncoder.encode(request.password()))
                .name(request.name())
                .nickname(request.nickname())
                .role(UserRole.USER)
                .status(UserStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        User savedUser = userRepository.save(user);

        return UserResponse.from(savedUser);
    }

    // 로그인
    @Transactional(readOnly = true)
    public UserResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다."));

        if (user.getStatus() == UserStatus.WITHDRAWN) {
            throw new IllegalStateException("탈퇴한 계정입니다.");
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 일치하지 않습니다.");
        }

        return UserResponse.from(user);
    }

    // 이메일 중복 확인
    @Transactional(readOnly = true)
    public boolean checkEmailAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    // 닉네임 중복 확인
    @Transactional(readOnly = true)
    public boolean checkNicknameAvailable(String nickname) {
        return !userRepository.existsByNickname(nickname);
    }

    // 회원 정보 조회
    @Transactional(readOnly = true)
    public UserResponse getUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        return UserResponse.from(user);
    }

    // 현재 비밀번호 확인
    @Transactional(readOnly = true)
    public boolean verifyPassword(Long userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        return passwordEncoder.matches(password, user.getPasswordHash());
    }

    // 비밀번호 변경
    @Transactional
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new BusinessException(ErrorCode.INVALID_PASSWORD);
        }

        user.changePassword(passwordEncoder.encode(newPassword));
    }

    // 회원 탈퇴
    @Transactional
    public void withdraw(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));

        user.withdraw();
    }
}
