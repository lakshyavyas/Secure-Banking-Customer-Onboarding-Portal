package com.bank.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
	
    private String token;
    private Long userId;
    private String username;
    private String role;
    private Boolean passwordChanged;

    
    
}
