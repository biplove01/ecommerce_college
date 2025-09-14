package com.biplove.ecommerce.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
  
  @GetMapping("/")
  private String loadHome(){
    return "Home page loaded";
  }
  
  @GetMapping("/allProducts")
  private String loadAllProducts(){
    
    return "All products loaded";
  }
}
// test for push biplove-feature
