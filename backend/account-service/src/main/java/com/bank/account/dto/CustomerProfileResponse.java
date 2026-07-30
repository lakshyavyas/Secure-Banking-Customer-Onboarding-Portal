package com.bank.account.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerProfileResponse {

    private Long customerId;
    private Long userId;
    private boolean profileCompleted;

   
}
