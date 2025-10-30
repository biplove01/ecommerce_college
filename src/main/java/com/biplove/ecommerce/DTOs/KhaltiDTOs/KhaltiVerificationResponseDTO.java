package com.biplove.ecommerce.DTOs.KhaltiDTOs;

import lombok.Data;

@Data
public class KhaltiVerificationResponseDTO {
  private String pidx;
  private String status;
  private String transactionId;
  private long amount;
  private String mobile;
  private String userEmail;
}
