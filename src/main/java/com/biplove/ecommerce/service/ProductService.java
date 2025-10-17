package com.biplove.ecommerce.service;

import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.ProductDoesnotExistsException;
import com.biplove.ecommerce.models.Product;
import com.biplove.ecommerce.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
  private final ProductRepository productRepository;
  
  ProductService(ProductRepository productRepository){
    this.productRepository = productRepository;
  }
  
  
  public Product saveProduct(Product product){
    return this.productRepository.save(product);
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
