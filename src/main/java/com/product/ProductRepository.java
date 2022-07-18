package com.product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Query("FROM ProductEntity p WHERE p.name = ?1")
    Optional<ProductEntity> findByName(String name);
}
