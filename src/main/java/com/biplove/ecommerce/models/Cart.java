package com.biplove.ecommerce.models;

import com.biplove.ecommerce.models.User.UserEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Cart {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @OneToOne
  @JoinColumn(name = "user_id")
  private UserEntity userEntity;
  
  @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CartProduct> cartProducts = new ArrayList<>();
  
}
