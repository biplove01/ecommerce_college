package com.biplove.ecommerce.service;

import com.biplove.ecommerce.models.Role;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerUserDetailsService implements UserDetailsService {
  
  private final UserRepository userRepository;
  
  @Autowired
  public CustomerUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }
  
  
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    UserEntity userEntity = this.userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("User with email : '" + email + "' not found"));;
    
    return new User(userEntity.getEmail(), userEntity.getPassword(), mapToGrantedAuthority(userEntity.getRoles()));
  }
  
  
  private Collection<GrantedAuthority> mapToGrantedAuthority (List<Role> roles){
    return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList());
  }
}
