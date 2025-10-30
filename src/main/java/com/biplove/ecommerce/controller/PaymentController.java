package com.biplove.ecommerce.controller;

import com.biplove.ecommerce.DTOs.KhaltiDTOs.KhaltiVerificationRequestDTO;
import com.biplove.ecommerce.DTOs.KhaltiDTOs.KhaltiVerificationResponseDTO;
import com.biplove.ecommerce.DTOs.KhaltiDTOs.PaymentInitiationRequestDTO;
import com.biplove.ecommerce.DTOs.KhaltiDTOs.PaymentInitiationResponseDTO;
import com.biplove.ecommerce.service.KhaltiService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {
  
  private final KhaltiService paymentService;
  
  @PostMapping("/khalti/initiate")
  public ResponseEntity<PaymentInitiationResponseDTO> initiatePayment(@RequestBody PaymentInitiationRequestDTO request) {
    
    return ResponseEntity.ok(paymentService.initiatePayment(request));
  }
  
  @PostMapping("/khalti/verify")
  public ResponseEntity<KhaltiVerificationResponseDTO> verifyPayment(@RequestBody KhaltiVerificationRequestDTO request) {
    return ResponseEntity.ok(paymentService.verifyPayment(request));
  }
}
