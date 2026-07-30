package com.bank.auth.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatusException(ResponseStatusException ex) {
        // ex.getReason() gets ONLY "Invalid credentials..." or "User not found"
        String cleanMessage = ex.getReason() != null ? ex.getReason() : ex.getMessage();

        return ResponseEntity
                .status(ex.getStatusCode())
                .body(Map.of("message", cleanMessage));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        return ResponseEntity
                .status(500)
                .body(Map.of("message", ex.getMessage()));
    }
}