package com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions;

public class UserDoesnotExistsException extends RuntimeException{
  public UserDoesnotExistsException(String message){
    super(message);
  }
}
