package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.models.User.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
  Iterable<Product> findByName(String name);
  
  @Query("SELECT p FROM Product p WHERE p.name LIKE %:keyword%")
  Page<Product> searchByNameWithPagination(String keyword, Pageable pageable);
  
  Iterable<Product> findBySeller(UserEntity seller);
  
  Iterable<Product> findBySeller_Id(Long sellerId);
}
