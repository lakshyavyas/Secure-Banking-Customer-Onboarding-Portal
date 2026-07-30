package com.bank.customer.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer_profiles")
public class CustomerProfile {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long customerId;

	    private Long userId;

	    private String firstName;

	    private String lastName;

	    private String email;

	    private String mobile;

	    private LocalDate dateOfBirth;

	    private String gender;

	    private Boolean profileCompleted;

}
