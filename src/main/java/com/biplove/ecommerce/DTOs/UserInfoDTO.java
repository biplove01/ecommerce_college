package com.biplove.ecommerce.DTOs;

import com.biplove.ecommerce.models.enums.SellerRankStatus;
import lombok.Data;

@Data
public class UserInfoDTO {
  
  private Long id;
  private String name;
  private String email;
  private String address;
  private Long phone;
  private Boolean isSeller;
  
  private String shopName;
  private SellerRankStatus sellerRankStatus;
}
