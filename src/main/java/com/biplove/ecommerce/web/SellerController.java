package com.biplove.ecommerce.web;

import com.biplove.ecommerce.DTOs.SellerDTO;
import com.biplove.ecommerce.models.User.SellerMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.service.SellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/seller")
public class SellerController {
  
  private final SellerService sellerService;
  
  SellerController (SellerService sellerService){
    this.sellerService = sellerService;
  }
  
  
  @GetMapping("/{id}")
  public SellerDTO getSeller(@PathVariable Long id){
    return this.sellerService.getSellerById(id);
  }
  
  
  @PostMapping("/update")
  public ResponseEntity<SellerDTO> updateSeller(@RequestBody UserEntity user){
    SellerDTO updatedSeller = this.sellerService.updateSeller(SellerMapper.mapToSellerDTO(user));
    return ResponseEntity.created(URI.create("/seller/"+updatedSeller.getId())).body(updatedSeller);
  }
  
  @GetMapping("/all")
  public Iterable<SellerDTO> getAllSellers(){
    return this.sellerService.getAllSellers();
  }
  
}
