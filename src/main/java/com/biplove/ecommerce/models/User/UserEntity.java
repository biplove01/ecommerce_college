package com.biplove.ecommerce.models.User;


import com.biplove.ecommerce.models.Role;
import com.biplove.ecommerce.models.abstractClass.Person;
import com.biplove.ecommerce.models.enums.CustomerRankStatus;
import com.biplove.ecommerce.models.enums.SellerRankStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "user")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String name;
  private String email;
  private String address;
  private Long phone;
  private String password;
  private CustomerRankStatus customerRankStatus;
  private SellerRankStatus sellerRankStatus;
  private String shopName;
  
  @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
  @JoinTable(name = "user_roles",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
  private List<Role> roles = new ArrayList<>();

}
