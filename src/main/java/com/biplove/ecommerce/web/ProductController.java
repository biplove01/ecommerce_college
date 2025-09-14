package com.biplove.ecommerce.web;

import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/product")
public class ProductController {
  
  private final ProductService productService;
  
  ProductController (ProductService productService){
    this.productService = productService;
  }

  @PostMapping("/create")
  private ResponseEntity<Product> createProduct(@RequestBody Product product){
  
    Product newProduct = this.productService.saveProduct(product);
    return ResponseEntity.created(URI.create("/product/"+ newProduct.getId())).body(newProduct);
  }
  
  @PostMapping("/update")
  private ResponseEntity<Product> updateProduct(@RequestBody Product product){
    
    Product newProduct = this.productService.updateProduct(product);
    return ResponseEntity.created(URI.create("/product/"+ newProduct.getId())).body(newProduct);
  }
  
  @GetMapping("/{id}")
  private Product getProduct(@PathVariable Long id){
    return this.productService.getProductById(id);
  }
  
  @DeleteMapping("/{id}")
  private ResponseEntity<String> deleteProduct(@PathVariable Long id){
    this.productService.removeProductById(id);
    return ResponseEntity.ok("Product of id "+ id + " successfully deleted");
  }
  
  @GetMapping("/all")
  private Iterable<Product> getAllProducts(){
    return this.productService.getAllProducts();
  }
  
}
