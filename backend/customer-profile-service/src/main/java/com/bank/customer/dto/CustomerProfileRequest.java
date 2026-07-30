package com.bank.customer.dto;

import java.time.LocalDate;

import com.bank.validation.MinimumAge;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class CustomerProfileRequest {
//    private Long userId;

	@NotBlank(message = "First name is required")
    @Size(min = 2, max = 30, message = "First name must be between 2 and 30 characters")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "First name should contain only letters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, max = 30, message = "Last name must be between 2 and 30 characters")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Last name should contain only letters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Mobile number must be 10 digits and start with 6-9"
    )
    private String mobile;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    @MinimumAge(18)
    private LocalDate dateOfBirth;

    @NotBlank(message = "Gender is required")
    @Pattern(
        regexp = "Male|Female|Other",
        message = "Gender must be Male, Female or Other"
    )
    private String gender;

    @Override
    public String toString() {
        return "CustomerProfileRequest [firstName=" + firstName +
                ", lastName=" + lastName +
                ", email=" + email +
                ", mobile=" + mobile +
                ", dateOfBirth=" + dateOfBirth +
                ", gender=" + gender + "]";
    }

}
