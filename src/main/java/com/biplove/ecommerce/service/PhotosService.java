package com.biplove.ecommerce.service;

import com.biplove.ecommerce.models.PhotoEntity;
import com.biplove.ecommerce.repository.PhotosRepository;
import org.springframework.stereotype.Service;

@Service
public class PhotosService {
  
  private final PhotosRepository photosRepository;
  
  public PhotosService(PhotosRepository photosRepository) {
    this.photosRepository = photosRepository;
  }
  
  
  
  public PhotoEntity save(String fileName, String contentType, byte[] fileData) {
    PhotoEntity photo = new PhotoEntity();
    
    photo.setFileName(fileName);
    photo.setImageData(fileData);
    photo.setContentType(contentType);
    
    return photosRepository.save(photo);
  }
  
  
  public PhotoEntity getPhoto(Long id) {
    return photosRepository.findById(id).orElse(null);
  }
  
  public Iterable<PhotoEntity> getAllPhotos() {
    return photosRepository.findAll();
  }
  
  public void delete(Long id) {
    photosRepository.deleteById(id);
  }
  
}
