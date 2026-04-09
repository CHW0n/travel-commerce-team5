package com.team5.travelcommerce.product.repository;

import com.team5.travelcommerce.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
