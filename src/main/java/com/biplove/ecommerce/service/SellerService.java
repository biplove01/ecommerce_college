package com.biplove.ecommerce.service;

import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.CannotBeEmptyException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserAlreadyExistsException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserDoesnotExistsException;
import com.biplove.ecommerce.DTOs.SellerDTO;
import com.biplove.ecommerce.models.User.SellerMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.models.enums.SellerRankStatus;
import com.biplove.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class SellerService {
  
  private final UserRepository userRepository;
  
  public SellerService (UserRepository userRepository){
    this.userRepository = userRepository;
  }
  
  
  public SellerDTO getSellerById(Long id){
    UserEntity sellerToSend = this.userRepository.findById(id).orElse(null);
    
    if(sellerToSend == null){
      throw new UserDoesnotExistsException("Seller of id: " + id + " does not exists ");
    }
    
    return SellerMapper.mapToSellerDTO(sellerToSend);
  }
  
  
  public SellerDTO updateSeller(SellerDTO user){
    
    boolean alreadyExists = this.userRepository.existsByEmail(user.getEmail());
    
    if(!alreadyExists){
      throw new UserDoesnotExistsException("User with the id "+ user.getId()+" does not exist");
    }
    UserEntity existingSeller = this.userRepository.findById(user.getId()).orElse(null);
    if(existingSeller == null){
      throw new UserDoesnotExistsException("User with the id "+ user.getId()+" does not exist");
    }
    existingSeller.setName(user.getName());
    existingSeller.setAddress(user.getAddress());
    existingSeller.setEmail(user.getEmail());
    existingSeller.setShopName(user.getShopName());
    existingSeller.setPhone(user.getPhone());
    
    return SellerMapper.mapToSellerDTO(this.userRepository.save(existingSeller));
  }
  
  
  //  temporary method. only for development phase
  public Iterable<SellerDTO> getAllSellers(){
    return this.userRepository.findAll().stream()
        .map(SellerMapper::mapToSellerDTO).collect(java.util.stream.Collectors.toList());
  }
  
  
//  public Boolean checkIfAlreadyExists(SellerDTO user){
//    if(user.getEmail() == null){
//      throw new CannotBeEmptyException("Email cannot be empty");
//    }
//    UserEntity existingSeller = this.userRepository.findByEmail(user.getEmail());
//
//    return existingSeller != null;
//  }
  
}
