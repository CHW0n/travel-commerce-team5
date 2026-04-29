package com.team5.travelcommerce.product.repository;

import com.team5.travelcommerce.product.domain.ProductDateStatus;
import com.team5.travelcommerce.product.domain.ProductStatus;
import com.team5.travelcommerce.product.domain.RegionStatus;
import com.team5.travelcommerce.product.entity.Product;
import java.time.LocalDate;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(
            value = """
                    select distinct p
                    from Product p
                    join p.region r
                    join ProductDate pd on pd.product = p
                    where p.status = :productStatus
                      and r.status = :regionStatus
                      and pd.availableDate = :availableDate
                      and (:regionName is null or r.regionName = :regionName)
                    """,
            countQuery = """
                    select count(distinct p.id)
                    from Product p
                    join p.region r
                    join ProductDate pd on pd.product = p
                    where p.status = :productStatus
                      and r.status = :regionStatus
                      and pd.availableDate = :availableDate
                      and (:regionName is null or r.regionName = :regionName)
                    """
    )
    Page<Product> findAvailableProducts(
            @Param("regionName") String regionName,
            @Param("availableDate") LocalDate availableDate,
            @Param("productStatus") ProductStatus productStatus,
            @Param("regionStatus") RegionStatus regionStatus,
            Pageable pageable
    );

    @Query(
            value = """
                    select distinct p
                    from Product p
                    join p.region r
                    where p.status = :productStatus
                      and r.status = :regionStatus
                      and (:regionName is null or r.regionName = :regionName)
                      and exists (
                          select 1
                          from ProductDate pd
                          where pd.product = p
                      )
                    """,
            countQuery = """
                    select count(distinct p.id)
                    from Product p
                    join p.region r
                    where p.status = :productStatus
                      and r.status = :regionStatus
                      and (:regionName is null or r.regionName = :regionName)
                      and exists (
                          select 1
                          from ProductDate pd
                          where pd.product = p
                      )
                    """
    )
    Page<Product> findBrowsableProducts(
            @Param("regionName") String regionName,
            @Param("productStatus") ProductStatus productStatus,
            @Param("regionStatus") RegionStatus regionStatus,
            Pageable pageable
    );

    @Query("""
            select p
            from Product p
            join fetch p.region r
            where p.id = :productId
              and p.status = :productStatus
              and r.status = :regionStatus
            """)
    Optional<Product> findActiveProductDetail(
            @Param("productId") Long productId,
            @Param("productStatus") ProductStatus productStatus,
            @Param("regionStatus") RegionStatus regionStatus
    );
}
