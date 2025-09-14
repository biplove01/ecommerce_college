package com.biplove.ecommerce.DTOs;

import com.biplove.ecommerce.models.enums.CustomerRankStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
  private Long id;
  private String name;
  private String address;
  private Long phone;
  private String email;
  private CustomerRankStatus customerRankStatus;
}

