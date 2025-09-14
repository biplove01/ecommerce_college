package com.biplove.ecommerce.GlobalExceptionHandler;

import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.CannotBeEmptyException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.ProductDoesnotExistsException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserAlreadyExistsException;
import com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions.UserDoesnotExistsException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHanlder {
  
  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<Map<String, String>> handleUserAlreadyExists(UserAlreadyExistsException exception){
    return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
  }
  
  @ExceptionHandler(UserDoesnotExistsException.class)
  public ResponseEntity<Map<String, String>> handleUserDoesnotExists(UserDoesnotExistsException exception){
    return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
  }
  
  @ExceptionHandler(ProductDoesnotExistsException.class)
  public ResponseEntity<Map<String, String>> handleProductDoesnotExists(ProductDoesnotExistsException exception){
    return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
  }
  
  @ExceptionHandler(CannotBeEmptyException.class)
  public ResponseEntity<Map<String, String>> handleCannotBeEmpty(CannotBeEmptyException exception){
    return ResponseEntity.badRequest().body(Map.of("error", exception.getMessage()));
  }
}
