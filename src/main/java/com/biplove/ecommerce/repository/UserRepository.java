package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.Role;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.models.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
  Optional<UserEntity> findByName (String name);
  
  boolean existsByEmail(String email);
  
  Optional<UserEntity> findByEmail(String email);
  

}
