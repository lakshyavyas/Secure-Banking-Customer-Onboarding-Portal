package com.bank.kyc.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerProfileResponse {

    private Long customerId;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private Boolean profileCompleted;

    // Getters & Setters
}
