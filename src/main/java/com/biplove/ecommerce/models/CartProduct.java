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
  @JoinTable(name="cart_id")
  private Cart cart;
  
  @ManyToOne
  @JoinTable(name="cart_product_and_product",
      joinColumns = @JoinColumn(name = "cart_product_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name="product_id", referencedColumnName = "id"))
  private Product product;
}
