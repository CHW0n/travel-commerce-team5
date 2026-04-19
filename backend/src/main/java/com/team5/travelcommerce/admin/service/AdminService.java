package com.team5.travelcommerce.admin.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {
    public List<Map<String, Object>> getAllUsers() {
        // 프론트엔드 JSX의 컬럼명과 100% 일치시킵니다.
        return List.of(
                Map.of(
                        "id", 1,
                        "name", "김다은",
                        "email", "daeun@gmail.com",
                        "nickname", "에이스",
                        "phone", "010-1234-5678",
                        "userId", "daeun_admin",
                        "date", "21.04.2026",
                        "update", ""
                ),
                Map.of(
                        "id", 2,
                        "name", "최희원",
                        "email", "heewon@gmail.com",
                        "nickname", "팀장님",
                        "phone", "010-9876-5432",
                        "userId", "heewon_dev",
                        "date", "21.04.2026",
                        "update", "22.04.2026"
                )
        );
    }
}