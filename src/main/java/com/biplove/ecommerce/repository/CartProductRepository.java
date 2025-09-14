package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.Cart;
import com.biplove.ecommerce.models.CartProduct;
import com.biplove.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
  
  Optional<CartProduct> findByCartAndProduct(Cart cart, Product product);
}
