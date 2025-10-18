package com.biplove.ecommerce.service;

import com.biplove.ecommerce.DTOs.ProductDTO;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.ProductDoesnotExistsException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserDoesnotExistsException;
import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.models.User.ProductMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.repository.ProductRepository;
import com.biplove.ecommerce.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProductService {
  private final ProductRepository productRepository;
  private final UserRepository userRepository;
  
  ProductService(ProductRepository productRepository, UserRepository userRepository) {
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }
  
  
  public ProductDTO saveProduct(Product product, UserDetails userDetails) {
    
    UserEntity seller = this.userRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new UserDoesnotExistsException(
            "The seller with email " + userDetails.getUsername() + " does not exist"
        ));
    
    if (product.getId() != null) {
      
      Product productToSave = this.productRepository.findById(product.getId())
          .orElse(new Product());
      
      
      productToSave.setName(product.getName());
      productToSave.setDescription(product.getDescription());
      productToSave.setImages(product.getImages());
      productToSave.setQuantity(product.getQuantity());
      productToSave.setPrice(product.getPrice());
      productToSave.setDiscountedPrice(product.getDiscountedPrice());
      productToSave.setRating(product.getRating());
      productToSave.setSeller(seller);
      
      Product savedProduct = this.productRepository.save(productToSave);
      return ProductMapper.mapToProductDTO(savedProduct);
      
    } else {
      Product productToSave = new Product();
      
      
      productToSave.setName(product.getName());
      productToSave.setDescription(product.getDescription());
      productToSave.setImages(product.getImages());
      productToSave.setQuantity(product.getQuantity());
      productToSave.setPrice(product.getPrice());
      productToSave.setDiscountedPrice(product.getDiscountedPrice());
      productToSave.setRating(0F);
      productToSave.setSeller(seller);
      
      Product savedProduct = this.productRepository.save(productToSave);
      return ProductMapper.mapToProductDTO(savedProduct);
    }
    
    
  }
  
  
  public Product updateProduct(Product product) {
    Boolean alreadyExists = this.checkIfAlreadyExists(product.getId());
    
    if (!alreadyExists) {
      throw new ProductDoesnotExistsException("Product with the id " + product.getId() + " does not exist");
    }
    
    Product existingProduct = this.productRepository.findById(product.getId()).orElse(null);
    if (existingProduct == null) {
      throw new ProductDoesnotExistsException("Product with the id " + product.getId() + " does not exist");
    }
    
    existingProduct.setName(product.getName());
    existingProduct.setPrice(product.getPrice());
    existingProduct.setDiscountedPrice(product.getDiscountedPrice());
    existingProduct.setQuantity(product.getQuantity());
    return this.productRepository.save(existingProduct);
  }
  
  
  public void removeProductById(Long id, UserDetails userDetails) {
    if (id == null) {
      throw new IllegalArgumentException("Product ID must not be null");
    }
    
    Optional<UserEntity> sellerThatSignedIn = this.userRepository.findByEmail(userDetails.getUsername());
    
    if (sellerThatSignedIn.isEmpty()) {
      throw new UserDoesnotExistsException("The sellerThatSignedIn of email " + userDetails.getUsername() + " does not exist");
    }
    
    Optional<Product> existingProduct = productRepository.findById(id);
    
    if (existingProduct.isEmpty()) {
      throw new EntityNotFoundException("Product of id " + id + " is not found");
    }
    
    if (Objects.equals(existingProduct.get().getSeller().getId(), sellerThatSignedIn.get().getId())) {
      this.productRepository.deleteById(id);
    }
  }
  
  
  public Product getProductById(Long id) {
    Product product1 = this.productRepository.findById(id).orElse(null);
    
    if (product1 == null) {
      throw new EntityNotFoundException("Product with id " + id + " not found!");
    }
    return product1;
  }
  
  
  public Iterable<Product> getAllProducts() {
    return this.productRepository.findAll();
  }
  
  
  public Iterable<ProductDTO> getAllProductsOfOneSeller(Long userId) {
    
    Iterable<Product> productsOfSeller = this.productRepository.findBySeller_Id(userId);
    
    List<ProductDTO> productDTOS = new ArrayList<>();
    
    for (Product product : productsOfSeller) {
      productDTOS.add(ProductMapper.mapToProductDTO(product));
    }
    
    return productDTOS;
  }
  
  public Iterable<Product> sort(String field) {
    
    return this.productRepository.findAll(Sort.by(Sort.Direction.ASC, field));
  }
  
  
  public Iterable<Product> sortWithPaginationAndOffsetAndField(String field, int offset, int pageSize) {
    return this.productRepository.findAll(PageRequest.of(offset, pageSize).withSort(Sort.by(field)));
  }
  
  
  public Iterable<Product> search(String keyword, String field, int offset, int pageSize) {
    
    if (pageSize < 1) {
      throw new IllegalArgumentException("Page size must be greater than zero.");
    }
    
    Pageable pageable = PageRequest.of(offset, pageSize, Sort.by(field));
    return this.productRepository.searchByNameWithPagination(keyword, pageable);
  }
  
  
  public Boolean checkIfAlreadyExists(Long id) {
    return this.productRepository.findById(id).orElse(null) != null;
  }
  
  
}
