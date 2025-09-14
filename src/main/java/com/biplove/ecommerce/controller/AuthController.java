package com.biplove.ecommerce.controller;

import com.biplove.ecommerce.DTOs.*;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserAlreadyExistsException;
import com.biplove.ecommerce.models.Role;
import com.biplove.ecommerce.models.User.CustomerMapper;
import com.biplove.ecommerce.models.User.SellerMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.repository.RoleRepository;
import com.biplove.ecommerce.repository.UserRepository;
import com.biplove.ecommerce.security.JWTGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collections;

@Slf4j
@RestController
@RequestMapping("/api/auth")

public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final PasswordEncoder passwordEncoder;
  private final JWTGenerator jwtGenerator;
  
  @Autowired
  public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JWTGenerator jwtGenerator) {
    this.authenticationManager = authenticationManager;
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtGenerator = jwtGenerator;
  }
  
  @PostMapping("/login")
  public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginDTO.getEmail(),
            loginDTO.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String token = jwtGenerator.generateToken(authentication);
    return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
  }
  
  @PostMapping("/register/customer")
  public ResponseEntity<CustomerDTO> register(@RequestBody RegisterDTO user){
    
    if(userRepository.existsByEmail(user.getEmail())){
        throw new UserAlreadyExistsException("This email is already taken!");
    }
    
    UserEntity newCustomer = new UserEntity();
    newCustomer.setName(user.getName());
    newCustomer.setPassword(passwordEncoder.encode(user.getPassword()));
    newCustomer.setEmail((user.getEmail()));
    
    Role roles = roleRepository.findByName("CUSTOMER")
        .orElseThrow(() -> new RuntimeException("Role CUSTOMER not found on DB"));
    newCustomer.setRoles(Collections.singletonList(roles));
    
    userRepository.save(newCustomer);
    
    return ResponseEntity.created(URI.create("/customer/"+ newCustomer.getId())).body(CustomerMapper.mapToCustomerDTO(newCustomer));
    
  }
  
  
  @PostMapping("/register/seller")
  public ResponseEntity<SellerDTO> registerSeller(@RequestBody RegisterDTO user){
    
    if(userRepository.existsByEmail(user.getEmail())){
//      return new ResponseEntity<>("The email is already taken", HttpStatus.BAD_REQUEST);
      throw new UserAlreadyExistsException("This email is already taken");
    }
    
    UserEntity newSeller = new UserEntity();
    newSeller.setName(user.getName());
    newSeller.setPassword(passwordEncoder.encode(user.getPassword()));
    newSeller.setEmail((user.getEmail()));
    
    Role roles = roleRepository.findByName("SELLER")
        .orElseThrow(() -> new RuntimeException("Role SELLER not found on DB"));
    newSeller.setRoles(Collections.singletonList(roles));
    
    userRepository.save(newSeller);
    
    return ResponseEntity.created(URI.create("/seller/"+ newSeller.getId())).body(SellerMapper.mapToSellerDTO(newSeller));
    
  }
}
