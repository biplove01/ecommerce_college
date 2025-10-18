package com.biplove.ecommerce.DTOs;

import lombok.Data;

@Data
public class ProductDTO {
  private Long id;
  private String name;
  private String description;
  private Long price;
  private Long discountedPrice;
  private Integer quantity;
  private Float rating;
  private String images;
  
  private SellerDTO seller;
}


