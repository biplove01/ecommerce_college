package com.biplove.ecommerce.web;

import com.biplove.ecommerce.DTOs.CustomerDTO;
import com.biplove.ecommerce.models.User.CustomerMapper;
import com.biplove.ecommerce.models.User.UserEntity;
import com.biplove.ecommerce.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/customer")
public class CustomerController {
  
  private final CustomerService customerService;
  
  public CustomerController(CustomerService customerService){
    this.customerService = customerService;
  }
  
  
  @GetMapping("/{id}")
  public CustomerDTO getCustomer(@PathVariable Long id) {
    return customerService.getCustomerById(id);
  }
  
  @PostMapping("/update")
  public ResponseEntity<CustomerDTO> updateCustomer(@RequestBody UserEntity user) {

    CustomerDTO updatedCustomer = this.customerService.updateCustomers(CustomerMapper.mapToCustomerDTO(user));
    return ResponseEntity.created(URI.create("/customer/"+ updatedCustomer.getId())).body(updatedCustomer);
  }
  
  @GetMapping("/all")
  public Iterable<CustomerDTO> getAllCustomer(){
    return this.customerService.getAllCustomers();
  }
  
}
