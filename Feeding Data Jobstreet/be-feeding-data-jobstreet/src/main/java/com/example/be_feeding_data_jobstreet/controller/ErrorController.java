package com.example.be_feeding_data_jobstreet.controller;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
@CrossOrigin(origins = "http://localhost:5173")
public class ErrorController {
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<String> constraintViolationException(ConstraintViolationException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(exception.getMessage());
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> apiException(ResponseStatusException exception){
        return ResponseEntity.status(exception.getStatusCode())
                .body(exception.getReason());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> exception(Exception exception){
        exception.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exception.getMessage());
    }
}
