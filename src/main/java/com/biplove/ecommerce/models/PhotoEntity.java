package com.biplove.ecommerce.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//import jakarta.validation.constraints.NotEmpty;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class PhotoEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String contentType;
  
  private String fileName;
  
  @Lob
  @Column(name = "image_data", columnDefinition = "MEDIUMBLOB")
  private byte[] imageData;
  
//  @jakarta.persistence.Id
//  private Long id;
  
}

