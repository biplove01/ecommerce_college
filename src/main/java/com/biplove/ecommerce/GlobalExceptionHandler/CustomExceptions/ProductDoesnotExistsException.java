package com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions;

public class ProductDoesnotExistsException extends RuntimeException{
  public ProductDoesnotExistsException(String message){
    super(message);
  }
}
