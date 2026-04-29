package com.team5.travelcommerce.user.service;

import com.team5.travelcommerce.global.BusinessException;
import com.team5.travelcommerce.user.domain.UserRole;
import com.team5.travelcommerce.user.domain.UserStatus;
import com.team5.travelcommerce.user.dto.response.UserResponse;
import com.team5.travelcommerce.user.entity.User;
import com.team5.travelcommerce.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User createUser(String passwordHash) {
        return User.builder()
                .email("test@example.com")
                .passwordHash(passwordHash)
                .name("홍길동")
                .nickname("gildong")
                .role(UserRole.USER)
                .status(UserStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    @Test
    @DisplayName("회원 정보 조회 성공")
    void getUser_success() {
        // given
        User user = createUser("hashedPassword");
        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        // when
        UserResponse response = userService.getUser(1L);

        // then
        assertThat(response.email()).isEqualTo("test@example.com");
        assertThat(response.name()).isEqualTo("홍길동");
        assertThat(response.nickname()).isEqualTo("gildong");
    }

    @Test
    @DisplayName("회원 정보 조회 실패 - 존재하지 않는 회원")
    void getUser_notFound() {
        // given
        given(userRepository.findById(1L)).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> userService.getUser(1L))
                .isInstanceOf(BusinessException.class)
                .hasMessage("존재하지 않는 회원입니다.");
    }

    @Test
    @DisplayName("비밀번호 확인 - 일치")
    void verifyPassword_matched() {
        // given
        User user = createUser("hashedPassword");
        given(userRepository.findById(1L)).willReturn(Optional.of(user));
        given(passwordEncoder.matches("password123!", "hashedPassword")).willReturn(true);

        // when
        boolean result = userService.verifyPassword(1L, "password123!");

        // then
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("비밀번호 확인 - 불일치")
    void verifyPassword_notMatched() {
        // given
        User user = createUser("hashedPassword");
        given(userRepository.findById(1L)).willReturn(Optional.of(user));
        given(passwordEncoder.matches("wrongPassword", "hashedPassword")).willReturn(false);

        // when
        boolean result = userService.verifyPassword(1L, "wrongPassword");

        // then
        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("비밀번호 변경 성공")
    void changePassword_success() {
        // given
        User user = createUser("hashedOldPassword");
        given(userRepository.findById(1L)).willReturn(Optional.of(user));
        given(passwordEncoder.matches("oldPassword123!", "hashedOldPassword")).willReturn(true);
        given(passwordEncoder.encode("newPassword123!")).willReturn("hashedNewPassword");

        // when
        userService.changePassword(1L, "oldPassword123!", "newPassword123!");

        // then
        assertThat(user.getPasswordHash()).isEqualTo("hashedNewPassword");
    }

    @Test
    @DisplayName("비밀번호 변경 실패 - 현재 비밀번호 불일치")
    void changePassword_wrongCurrentPassword() {
        // given
        User user = createUser("hashedOldPassword");
        given(userRepository.findById(1L)).willReturn(Optional.of(user));
        given(passwordEncoder.matches("wrongPassword", "hashedOldPassword")).willReturn(false);

        // when & then
        assertThatThrownBy(() -> userService.changePassword(1L, "wrongPassword", "newPassword123!"))
                .isInstanceOf(BusinessException.class)
                .hasMessage("현재 비밀번호가 일치하지 않습니다.");
    }

    @Test
    @DisplayName("회원 탈퇴 성공")
    void withdraw_success() {
        // given
        User user = createUser("hashedPassword");
        given(userRepository.findById(1L)).willReturn(Optional.of(user));

        // when
        userService.withdraw(1L);

        // then
        assertThat(user.getStatus()).isEqualTo(UserStatus.WITHDRAWN);
    }

    @Test
    @DisplayName("회원 탈퇴 실패 - 존재하지 않는 회원")
    void withdraw_notFound() {
        // given
        given(userRepository.findById(1L)).willReturn(Optional.empty());

        // when & then
        assertThatThrownBy(() -> userService.withdraw(1L))
                .isInstanceOf(BusinessException.class)
                .hasMessage("존재하지 않는 회원입니다.");
    }
}
