package com.biplove.ecommerce.service;

import com.biplove.ecommerce.DTOs.ProductDTO;
import com.biplove.ecommerce.DTOs.SellerDTO;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.ProductDoesnotExistsException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserDoesnotExistsException;
import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.models.User.ProductMapper;
import com.biplove.ecommerce.models.User.SellerMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.repository.ProductRepository;
import com.biplove.ecommerce.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
  private final ProductRepository productRepository;
  private final UserRepository userRepository;
  
  ProductService(ProductRepository productRepository, UserRepository userRepository){
    this.productRepository = productRepository;
    this.userRepository = userRepository;
  }
  
  
  public ProductDTO saveProduct(Product product, UserDetails userDetails){
    
    Optional<UserEntity> seller = this.userRepository.findByEmail(userDetails.getUsername());
    
    if(seller.isEmpty()){
      throw new UserDoesnotExistsException("The seller of email " + userDetails.getUsername() + " does not exist");
    }
    
    
    
    Product productToSave = new Product();
//    ProductDTO productToSave = new ProductDTO();
    
    productToSave.setName(product.getName());
    productToSave.setDescription(product.getDescription());
    productToSave.setImages(product.getImages());
    productToSave.setRating(0F);
    productToSave.setQuantity(product.getQuantity());
    productToSave.setPrice(product.getPrice());
    productToSave.setDiscountedPrice(product.getDiscountedPrice());
    
//    SellerDTO sellerDTO = new SellerDTO();
    
    productToSave.setSeller(seller.get());
//    productToSave.setSeller(SellerMapper.mapToSellerDTO(seller.get()));
    Product savedProduct = this.productRepository.save(productToSave);
    
    
    return ProductMapper.mapToProductDTO(savedProduct);
  }
  
  public Product updateProduct(Product product){
    Boolean alreadyExists = this.checkIfAlreadyExists(product.getId());
    
    if(!alreadyExists){
      throw new ProductDoesnotExistsException("Product with the id "+ product.getId()+" does not exist");
    }
    
    Product existingProduct = this.productRepository.findById(product.getId()).orElse(null);
    if(existingProduct == null){
      throw new ProductDoesnotExistsException("Product with the id "+ product.getId()+" does not exist");
    }
    
    existingProduct.setName(product.getName());
    existingProduct.setPrice(product.getPrice());
    existingProduct.setDiscountedPrice(product.getDiscountedPrice());
    existingProduct.setQuantity(product.getQuantity());
    return this.productRepository.save(existingProduct);
  }
  
  public void removeProductById(Long id){
    if (id == null) {
      throw new IllegalArgumentException("Product ID must not be null");
    }
    Boolean productExists = checkIfAlreadyExists(id);
    if(productExists){
       this.productRepository.deleteById(id);
    } else{
      throw new EntityNotFoundException("Product of id: "+ id +" does not exists");
    }
  }
  
  public Product getProductById(Long id){
    Product product1 = this.productRepository.findById(id).orElse(null);
    
    if(product1 == null){
      throw new EntityNotFoundException("Product with id "+ id+" not found!");
    }
    return product1;
  }
  
  public Iterable<Product> getAllProducts(){
    return this.productRepository.findAll();
  }
  
  
  public Iterable<Product> sort(String field){
    
    return this.productRepository.findAll(Sort.by(Sort.Direction.ASC, field));
  }
  
  public Iterable<Product> sortWithPaginationAndOffsetAndField(String field, int offset, int pageSize){
    return this.productRepository.findAll(PageRequest.of(offset, pageSize).withSort(Sort.by(field)));
  }
  
  public Iterable<Product> search(String keyword, String field, int offset, int pageSize ){
    
    if (pageSize < 1) {
      throw new IllegalArgumentException("Page size must be greater than zero.");
    }
    
    Pageable pageable = PageRequest.of(offset, pageSize, Sort.by(field));
    return this.productRepository.searchByNameWithPagination(keyword, pageable);
  }
  
  
  public Boolean checkIfAlreadyExists(Long id){
    return this.productRepository.findById(id).orElse(null) != null;
  }
  
}
