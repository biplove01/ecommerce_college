package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Long> {
}
