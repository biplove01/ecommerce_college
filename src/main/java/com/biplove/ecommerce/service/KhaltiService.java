package com.biplove.ecommerce.service;

import com.biplove.ecommerce.DTOs.KhaltiDTOs.KhaltiVerificationRequestDTO;
import com.biplove.ecommerce.DTOs.KhaltiDTOs.KhaltiVerificationResponseDTO;
import com.biplove.ecommerce.DTOs.KhaltiDTOs.PaymentInitiationRequestDTO;
import com.biplove.ecommerce.DTOs.KhaltiDTOs.PaymentInitiationResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class KhaltiService {
  
  @Value("${khalti.api.baseurl}")
  private String baseUrl;
  
  @Value("${khalti.api.initiation-url}")
  private String initiationUrl;
  
  @Value("${khalti.api.verification-url}")
  private String verificationUrl;
  
  @Value("${khalti.secret.key}")
  private String secretKey;
  
  private final RestTemplate restTemplate = new RestTemplate();
  
  public PaymentInitiationResponseDTO initiatePayment(PaymentInitiationRequestDTO request) {
    String url = baseUrl + initiationUrl;
    
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Key " + secretKey);
    headers.setContentType(MediaType.APPLICATION_JSON);
    
    Map<String, Object> body = new HashMap<>();
    body.put("return_url", "http://localhost:3000/verify");
    
    body.put("website_url", "http://localhost:3000/");
    body.put("amount", request.getAmount());
    body.put("purchase_order_id", request.getPurchaseOrderId());
    body.put("purchase_order_name", request.getPurchaseOrderName());
 
    
    Map<String, String> customerInfo = new HashMap<>();
    if (request.getCustomerName() != null) customerInfo.put("name", request.getCustomerName());
    if (request.getCustomerEmail() != null) customerInfo.put("email", request.getCustomerEmail());
    if (request.getCustomerPhone() != null) customerInfo.put("phone", request.getCustomerPhone());
    
    if (!customerInfo.isEmpty()) body.put("customer_info", customerInfo);
    
    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
    
    try {
      ResponseEntity<PaymentInitiationResponseDTO> response =
          restTemplate.postForEntity(url, entity, PaymentInitiationResponseDTO.class);
      return response.getBody();
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException("Khalti initiation failed: " + e.getMessage());
    }
  }
  
  
  public KhaltiVerificationResponseDTO verifyPayment(KhaltiVerificationRequestDTO request) {
    String url = baseUrl + verificationUrl;
    
    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "Key " + secretKey);
    headers.setContentType(MediaType.APPLICATION_JSON);
    
    Map<String, String> body = new HashMap<>();
    body.put("pidx", request.getPidx());
    
    HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);
    ResponseEntity<KhaltiVerificationResponseDTO> response =
        restTemplate.postForEntity(url, entity, KhaltiVerificationResponseDTO.class);
    
    return response.getBody();
  }
}
