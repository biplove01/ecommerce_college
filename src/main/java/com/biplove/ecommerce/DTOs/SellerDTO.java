package com.biplove.ecommerce.DTOs;

import com.biplove.ecommerce.models.enums.SellerRankStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SellerDTO {
 
  private Long id;
  private String name;
  private String shopName;
  private String email;
  private String address;
  private Long phone;
  private SellerRankStatus sellerRankStatus;
  
}
