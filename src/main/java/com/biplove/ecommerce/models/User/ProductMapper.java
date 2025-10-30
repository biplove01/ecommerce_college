package com.biplove.ecommerce.models.User;

import com.biplove.ecommerce.DTOs.ProductDTO;
import com.biplove.ecommerce.models.Product;

public class ProductMapper {
  public static ProductDTO mapToProductDTO(Product product) {
    if (product == null) return null;
    
    ProductDTO dto = new ProductDTO();
    dto.setId(product.getId());
    dto.setName(product.getName());
    dto.setDescription(product.getDescription());
    dto.setPrice(product.getPrice());
    dto.setDiscountedPrice(product.getDiscountedPrice());
    dto.setQuantity(product.getQuantity());
    dto.setRating(product.getRating());
    dto.setImages(product.getImages() != null ? String.join("+", product.getImages()) : null);
    dto.setSeller(SellerMapper.mapToSellerDTO(product.getSeller()));
    
    return dto;
  }
}
