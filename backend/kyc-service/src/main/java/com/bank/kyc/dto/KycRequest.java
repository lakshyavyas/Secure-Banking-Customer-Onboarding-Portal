package com.bank.kyc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class KycRequest {
	 	private Long userId;

	 	@NotBlank(message = "Aadhaar Number is required")
	    @Pattern(
	        regexp = "^\\d{12}$",
	        message = "Aadhaar Number must contain exactly 12 digits"
	    )
	    private String aadhaarNumber;

	    @NotBlank(message = "PAN Number is required")
	    @Pattern(
	        regexp = "^[A-Z]{5}[0-9]{4}[A-Z]$",
	        message = "Invalid PAN Number"
	    )
	    private String panNumber;

	    @NotBlank(message = "Address is required")
	    @Size(min = 10, max = 250,
	          message = "Address must be between 10 and 250 characters")
	    private String address;

	    public Long getUserId() {
	        return userId;
	    }

	    public void setUserId(Long userId) {
	        this.userId = userId;
	    }

	    public String getAadhaarNumber() {
	        return aadhaarNumber;
	    }

	    public void setAadhaarNumber(String aadhaarNumber) {
	        this.aadhaarNumber = aadhaarNumber;
	    }

	    public String getPanNumber() {
	        return panNumber;
	    }

	    public void setPanNumber(String panNumber) {
	        this.panNumber = panNumber;
	    }

	    public String getAddress() {
	        return address;
	    }

	    public void setAddress(String address) {
	        this.address = address;
	    }
}
