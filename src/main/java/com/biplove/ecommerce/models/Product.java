package com.biplove.ecommerce.models;

import com.biplove.ecommerce.models.User.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String name;
  private String description;
  private Long price;
  private Integer quantity;
  private Long discountedPrice;
  private Float rating;
  private String images;
  
  
  @ManyToOne
  @JoinColumn(name = "seller_id")
  private UserEntity seller;
  
}
