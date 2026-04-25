package com.team5.travelcommerce.product.service;

import com.team5.travelcommerce.product.domain.RegionStatus;
import com.team5.travelcommerce.product.dto.response.RegionResponse;
import com.team5.travelcommerce.product.repository.RegionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegionService {

    private final RegionRepository regionRepository;

    public List<RegionResponse> getActiveRegions() {
        return regionRepository.findAllByStatusOrderByDisplayOrderAsc(RegionStatus.ACTIVE)
                .stream()
                .map(RegionResponse::from)
                .toList();
    }
}
