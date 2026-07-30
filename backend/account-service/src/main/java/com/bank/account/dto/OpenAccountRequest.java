package com.bank.account.dto;

import com.bank.account.enums.AccountType;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class OpenAccountRequest {

	@NotNull(message = "Account type is required")
    private AccountType accountType;
	
	@PositiveOrZero(message = "Initial balance cannot be negative")
    private Double balance;

    public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(AccountType accountType) {
        this.accountType = accountType;
    }
}