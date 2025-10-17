package com.biplove.ecommerce.controller;

import com.biplove.ecommerce.DTOs.CartDTO;
import com.biplove.ecommerce.DTOs.CartProductDTO;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.repository.UserRepository;
import com.biplove.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {
  
  private final CartService cartService;
  private final UserRepository userRepository;
  
  @Autowired
  public CartController(CartService cartService, UserRepository userRepository) {
    this.cartService = cartService;
    this.userRepository = userRepository;
  }
  
  @PostMapping("/add")
  public ResponseEntity<String> addProductToCart(@AuthenticationPrincipal UserDetails userDetails, @RequestBody CartProductDTO cartItemRequest) {
    
    UserEntity user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    cartService.addProductToCart(user, cartItemRequest.getProductId(), cartItemRequest.getQuantity());
    
    return new ResponseEntity<>("Product added to cart", HttpStatus.OK);
  }
  
  
  @DeleteMapping("/remove/{cartProductId}")
  public ResponseEntity<String> removeProductFromCart(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long cartProductId) {
    UserEntity user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    cartService.removeProductFromCart(user, cartProductId);
    
    return new ResponseEntity<>("Product removed from cart", HttpStatus.OK);
  }
  
//  @GetMapping("/getAll")
//  public List<CartItem> getAllCartProducts(@AuthenticationPrincipal UserDetails userDetails){
//    UserEntity user = userRepository.findByEmail(userDetails.getUsername())
//        .orElseThrow(() -> new RuntimeException("User not found"));
//
//    return cartService.getAllCartProducts(user);
//  }
  
  @GetMapping("/getAll")
  public ResponseEntity<CartDTO> getCart(@AuthenticationPrincipal UserDetails userDetails) {
    UserEntity user = userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new RuntimeException("User not found"));
    
    CartDTO cartDTO = cartService.getCartDTO(user);
    return ResponseEntity.ok(cartDTO);
  }
}
