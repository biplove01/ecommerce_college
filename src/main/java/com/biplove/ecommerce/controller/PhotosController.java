package com.biplove.ecommerce.controller;


import com.biplove.ecommerce.models.PhotoEntity;
import com.biplove.ecommerce.service.PhotosService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@RequestMapping("/photos")
public class PhotosController {
  
  private final PhotosService photosService;
  
  public PhotosController(PhotosService photosService) {
    this.photosService = photosService;
  }
  
  @PostMapping("/upload")
  public PhotoEntity post(@RequestPart("imageData") MultipartFile file) throws IOException {
    
    return photosService.save(file.getOriginalFilename(), file.getContentType(), file.getBytes());
  }
  
  @GetMapping("/{id}")
  public PhotoEntity get(@PathVariable Long id) {
    PhotoEntity photo = photosService.getPhoto(id);
    
    if (photo == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return photo;
  }
  
  @GetMapping("/all")
  public Iterable<PhotoEntity> get() {
    return photosService.getAllPhotos();
  }
  
  
  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    
    photosService.delete(id);
  }
  
}
