package com.team5.travelcommerce.user.repository;

import com.team5.travelcommerce.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
