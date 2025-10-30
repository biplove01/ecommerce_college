package com.biplove.ecommerce.DTOs;

import com.biplove.ecommerce.models.enums.CustomerRankStatus;
import lombok.Data;

@Data
public class CustomerRegisterDTO {
  private String name;
  private String email;
  private String password;
  private Long phone;
  private String address;
  private CustomerRankStatus customerRankStatus;
}
