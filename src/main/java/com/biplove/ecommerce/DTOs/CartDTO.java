package com.biplove.ecommerce.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class CartDTO {
  private Long cartId;
  private List<CartProductDTO> items;
  
}
