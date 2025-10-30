package com.biplove.ecommerce.controller;

import com.biplove.ecommerce.DTOs.ProductDTO;
import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/product")
public class ProductController {
  
  private final ProductService productService;
  
  ProductController(ProductService productService) {
    this.productService = productService;
  }
  
  @PostMapping("/create")
  private ResponseEntity<ProductDTO> createProduct(@RequestBody Product product, @AuthenticationPrincipal UserDetails userDetails) {
    
    ProductDTO newProduct = this.productService.saveProduct(product, userDetails);
    return ResponseEntity.created(URI.create("/product/" + newProduct.getId())).body(newProduct);
  }
  
  @PostMapping("/update")
  private ResponseEntity<Product> updateProduct(@RequestBody Product product) {
    
    Product newProduct = this.productService.updateProduct(product);
    return ResponseEntity.created(URI.create("/product/" + newProduct.getId())).body(newProduct);
  }
  
  @GetMapping("/{id}")
  private Product getProduct(@PathVariable Long id) {
    return this.productService.getProductById(id);
  }
  
  @DeleteMapping("/{id}")
  private ResponseEntity<String> deleteProduct(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
    this.productService.removeProductById(id, userDetails);
    return ResponseEntity.ok("Product of id " + id + " successfully deleted");
  }
  
  @GetMapping("/all")
  private Iterable<Product> getAllProducts() {
    return this.productService.getAllProducts();
  }
  
  @GetMapping("/all/{userId}")
  private Iterable<ProductDTO> getAllProductsOfOneSeller(@PathVariable Long userId) {
    return this.productService.getAllProductsOfOneSeller(userId);
  }
  
  @GetMapping("/sort/{field}")
  private Iterable<Product> sort(@PathVariable String field) {
    
    return this.productService.sort(field);
  }
  
  @GetMapping("/pagination/{offset}/{pageSize}/{field}")
  private Iterable<Product> pagination(@PathVariable String field, @PathVariable int offset, @PathVariable int pageSize) {
    
    return this.productService.sortWithPaginationAndOffsetAndField(field, offset, pageSize);
  }
  
  @GetMapping("/search/{keyword}/{field}/{offset}/{pageSize}")
  private Iterable<Product> search(@PathVariable String keyword, @PathVariable String field, @PathVariable int offset, @PathVariable int pageSize) {
    
    return this.productService.search(keyword, field, offset, pageSize);
  }
  
  
}
