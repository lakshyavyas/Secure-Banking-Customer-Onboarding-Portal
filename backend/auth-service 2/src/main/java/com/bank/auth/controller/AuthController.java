package com.bank.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bank.auth.dto.ChangePasswordRequest;
import com.bank.auth.dto.CustomerRegisterRequest;
import com.bank.auth.dto.LoginRequest;
import com.bank.auth.dto.LoginResponse;
import com.bank.auth.entity.User;
import com.bank.auth.security.JwtUtil;
import com.bank.auth.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User registerCustomer(@Valid @RequestBody CustomerRegisterRequest request) {
        return userService.registerCustomer(request);
    }
    
//    @PreAuthorize("isAuthenticated()")
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequest request) {

        userService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully");
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            boolean result = userService.login(request.getUsername(), request.getPassword());

            if (result) {
                User user = userService.getUserByUsername(request.getUsername());

                String token = jwtUtil.generateToken(
                        user.getId(), 
                        user.getUsername(), 
                        user.getRole().name()
                );

                return new LoginResponse(
                        token,
                        user.getId(),
                        user.getUsername(),
                        user.getRole().name(),
                        user.getPasswordChanged()
                );
            }
            
            // Fallback generic error if login returned false without throwing an exception
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials");

        } catch (RuntimeException e) {
            // Catches the dynamic exception message from UserService/Redis (e.g., attempt counts & lockout status)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
        }
        
    }
    
   
  
}