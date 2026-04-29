package com.team5.travelcommerce.product.repository;

import com.team5.travelcommerce.product.domain.RegionStatus;
import com.team5.travelcommerce.product.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegionRepository extends JpaRepository<Region, Long> {

    List<Region> findAllByStatusOrderByDisplayOrderAsc(RegionStatus status);

    List<Region> findAllByStatus(RegionStatus status);
}
