package com.bank.account.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.bank.account.enums.AccountStatus;
import com.bank.account.enums.AccountType;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountId;

    @Column(unique = true)
    private Long accountNumber;
    


    //@Column(unique = true)
    private Long userId;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private BigDecimal balance;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    private LocalDateTime createdAt;
    
    private LocalDateTime activatedAt;

    private String remarks;
}
