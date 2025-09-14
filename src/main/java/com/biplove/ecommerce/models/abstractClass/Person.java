package com.biplove.ecommerce.models.abstractClass;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class Person {
  
  private String name;
  private String email;
  private String address;
  private Long phone;
  private String password;
  
}
