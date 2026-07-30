package com.bank.kyc.entity;

import java.time.LocalDateTime;

import com.bank.kyc.enums.KycStatus;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.bank.kyc.security.AesEncryptor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "kyc_records")
public class KycRecord {
    @Id
    @GeneratedValue(	strategy = GenerationType.IDENTITY)
	private Long kycId;

    private Long userId;

    @Convert(converter = AesEncryptor.class)
    private String aadhaarNumber;

    @Convert(converter = AesEncryptor.class)
    private String panNumber;

    @Convert(converter = AesEncryptor.class)
    private String address;

    @Enumerated(EnumType.STRING)
    private KycStatus status;
    
    private String panFileName;

    private String aadhaarFileName;

    private String remarks;

    private LocalDateTime submittedAt;

    private LocalDateTime approvedAt;

}
