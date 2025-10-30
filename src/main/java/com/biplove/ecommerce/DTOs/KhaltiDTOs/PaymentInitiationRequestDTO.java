package com.biplove.ecommerce.DTOs.KhaltiDTOs;

import lombok.Data;

@Data
public class PaymentInitiationRequestDTO {
  private long amount;
  private String purchaseOrderId;
  private String purchaseOrderName;
  // Optional customer info
  private String customerName;
  private String customerEmail;
  private String customerPhone;
}
