package com.biplove.ecommerce.DTOs;

import lombok.Data;

@Data
public class CartProductDTO {
  private Long cartProductId;
  private Long productId;
  private String productName;
  private double productPrice;
  private int quantity;
  
}

