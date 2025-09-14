package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.Cart;
import com.biplove.ecommerce.models.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
  
  Optional<Cart> findByUserEntity(UserEntity userEntity);
}
