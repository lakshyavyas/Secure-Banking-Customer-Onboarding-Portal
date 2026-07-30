package com.bank.kyc.dto;

import com.bank.kyc.enums.KycStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingKycResponse {

    private Long kycId;

    private String customerName;

    private String aadhaarNumber;

    private String panNumber;

    private KycStatus status;

    private Long userId;
}
