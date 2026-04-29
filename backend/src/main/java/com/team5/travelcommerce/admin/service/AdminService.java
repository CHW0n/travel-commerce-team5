package com.team5.travelcommerce.admin.service;

import com.team5.travelcommerce.admin.dto.response.AdminUserResponse;
import com.team5.travelcommerce.user.repository.UserRepository; // 유저 리포지토리 연결
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<AdminUserResponse> getAllUsers() {
        // DB에서 엔티티를 가져와 명세서 응답 모델(DTO)로 변환 [cite: 36, 94]
        return userRepository.findAll().stream()
                .map(user -> AdminUserResponse.builder()
                        .userId(user.getId())
                        .email(user.getEmail())
                        .nickname(user.getNickname())
                        .role(user.getRole().name()) // Enum일 경우 name() 사용
                        .status(user.getStatus().name()) // [cite: 27]
                        .build())
                .collect(Collectors.toList());
    }
}