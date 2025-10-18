package com.biplove.ecommerce.DTOs;

import com.biplove.ecommerce.models.enums.SellerRankStatus;
import lombok.Data;

@Data
public class SellerRegisterDTO {
  private String name;
  private String email;
  private String password;
  private Long phone;
  private String shopName;
  private String address;
  private SellerRankStatus sellerRankStatus;
}
