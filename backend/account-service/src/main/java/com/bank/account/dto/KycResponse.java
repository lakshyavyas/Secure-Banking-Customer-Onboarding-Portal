package com.bank.account.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KycResponse {

    private Long kycId;
    private Long userId;
    private String status;


}
