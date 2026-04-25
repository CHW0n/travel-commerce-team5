package com.team5.travelcommerce.product.repository;

import com.team5.travelcommerce.product.domain.ProductDateStatus;
import com.team5.travelcommerce.product.entity.ProductDate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductDateRepository extends JpaRepository<ProductDate, Long> {

    List<ProductDate> findAllByProductIdAndStatusOrderByAvailableDateAsc(Long productId, ProductDateStatus status);

    List<ProductDate> findAllByProductIdOrderByAvailableDateAsc(Long productId);

}
