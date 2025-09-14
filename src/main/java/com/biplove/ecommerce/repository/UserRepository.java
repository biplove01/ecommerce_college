package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.User.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByName (String name);
  
  boolean existsByEmail(String email);
  
  Optional<UserEntity> findByEmail(String email);
  
//  UserEntity findByShopName(String shopName);
}
