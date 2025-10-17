package com.biplove.ecommerce.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartProduct {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private Integer quantity;
  
  @ManyToOne
  @JoinColumn(name="cart_id", nullable = false)
  private Cart cart;
  
  @ManyToOne
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;
}
