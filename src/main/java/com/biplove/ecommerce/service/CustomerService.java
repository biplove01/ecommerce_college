package com.biplove.ecommerce.service;

import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.CannotBeEmptyException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserAlreadyExistsException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserDoesnotExistsException;
import com.biplove.ecommerce.DTOs.CustomerDTO;
import com.biplove.ecommerce.models.User.CustomerMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.models.enums.CustomerRankStatus;
import com.biplove.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class CustomerService {
  
  private final UserRepository userRepository;
  
  public CustomerService(UserRepository userRepository){
    this.userRepository = userRepository;
  }
  
  
  public CustomerDTO getCustomerById(Long id){
    
    UserEntity user = this.userRepository.findById(id).orElse(null);
    
    if(user != null){
      return CustomerMapper.mapToCustomerDTO(user);
    }
    
    throw new UserDoesnotExistsException("User of id "+ id+ " doesnot exists");
  }
  
  
  public CustomerDTO updateCustomers(CustomerDTO user){
    boolean alreadyExists = this.userRepository.existsByEmail(user.getEmail());
    
    if(!alreadyExists){
      throw new UserDoesnotExistsException("User with the id "+ user.getId()+" does not exist");
    }
    
    UserEntity existingCustomer = this.userRepository.findById(user.getId()).orElse(null);
    
    if(existingCustomer == null){
      throw new UserDoesnotExistsException("User with the id  "+ user.getId()+" does not exist");
    }
    existingCustomer.setName(user.getName());
    existingCustomer.setAddress(user.getAddress());
    existingCustomer.setEmail(user.getEmail());
    existingCustomer.setPhone(user.getPhone());
    
    return CustomerMapper.mapToCustomerDTO(this.userRepository.save(existingCustomer));
  }
  
  
  public Iterable<CustomerDTO> getAllCustomers(){
    return this.userRepository.findAll().stream()
        .map(CustomerMapper::mapToCustomerDTO).collect(java.util.stream.Collectors.toList());
  }
}


