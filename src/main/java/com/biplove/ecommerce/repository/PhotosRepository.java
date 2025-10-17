package com.biplove.ecommerce.repository;

import com.biplove.ecommerce.models.PhotoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhotosRepository extends JpaRepository<PhotoEntity, Long> {
}
