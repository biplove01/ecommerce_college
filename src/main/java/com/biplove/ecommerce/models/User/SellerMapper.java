package com.biplove.ecommerce.models.User;

import com.biplove.ecommerce.DTOs.SellerDTO;

public class SellerMapper {
  
  public static SellerDTO mapToSellerDTO(UserEntity user){
    
    return new SellerDTO(
        user.getId(),
        user.getName(),
        user.getShopName(),
        user.getEmail(),
        user.getAddress(),
        user.getPhone(),
        user.getSellerRankStatus()
    );
  }
}
