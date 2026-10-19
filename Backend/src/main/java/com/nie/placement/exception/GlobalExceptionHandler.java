package com.nie.placement.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFound(
            ResourceNotFoundException ex) {

        return new ResponseEntity<>(
                ex.getMessage(),
                HttpStatus.NOT_FOUND
        );
}};
