package com.biplove.ecommerce.models.User;

import com.biplove.ecommerce.DTOs.CustomerDTO;

public class CustomerMapper {
  
  public static CustomerDTO mapToCustomerDTO(UserEntity user){
    
    return new CustomerDTO(
        user.getId(),
        user.getName(),
        user.getAddress(),
        user.getPhone(),
        user.getEmail(),
        user.getCustomerRankStatus()
    );
  }
}
