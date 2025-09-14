package com.biplove.ecommerce.models;

import com.biplove.ecommerce.models.User.UserEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class LikedItem {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne
  @JoinColumn(name="user_id")
  private UserEntity customer;
  
  @ManyToOne
  @JoinTable(name="product_id")
  private Product product;
  
  
}
