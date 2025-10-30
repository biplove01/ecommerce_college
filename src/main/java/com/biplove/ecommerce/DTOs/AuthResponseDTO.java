package com.biplove.ecommerce.DTOs;

import lombok.Data;

@Data
public class AuthResponseDTO {
  
  private String accessToken;
  private CustomerDTO customerDTO;
  private SellerDTO sellerDTO;
  private String tokenType = "Bearer ";
  
  public AuthResponseDTO (String accessToken, CustomerDTO customerDTO){
    this.accessToken = accessToken;
    this.customerDTO = customerDTO;
  }
  
  public AuthResponseDTO (String accessToken, SellerDTO sellerDTO){
    this.accessToken = accessToken;
    this.sellerDTO = sellerDTO;
  }
}
