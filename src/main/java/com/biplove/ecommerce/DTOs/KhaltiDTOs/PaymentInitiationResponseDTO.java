package com.biplove.ecommerce.DTOs.KhaltiDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PaymentInitiationResponseDTO {
  private String pidx;
  
  private String message;
  
  @JsonProperty("payment_url")
  private String paymentUrl;
  
  @JsonProperty("expires_at")
  private String expiresAt;
}
