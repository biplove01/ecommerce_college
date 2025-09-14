package com.biplove.ecommerce.models;

import com.biplove.ecommerce.models.User.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String name;
  private Long price;
  private Integer quantity;
  private Long discountedPrice;
  
  
  @ManyToOne
  @JoinColumn(name = "seller_id")
  private UserEntity seller;
  
}
