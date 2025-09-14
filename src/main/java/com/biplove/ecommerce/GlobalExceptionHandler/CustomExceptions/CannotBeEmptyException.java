package com.biplove.ecommerce.GlobalExceptionHandler.CustomExceptions;

public class CannotBeEmptyException extends RuntimeException {
  public CannotBeEmptyException(String message) {
    super(message);
  }
}
