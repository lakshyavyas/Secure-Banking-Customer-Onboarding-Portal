package com.bank.customer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.customer.dto.CustomerProfileRequest;
import com.bank.customer.dto.GenderChartResponse;
import com.bank.customer.entity.CustomerProfile;
import com.bank.customer.service.CustomerProfileService;

import jakarta.validation.Valid;
@CrossOrigin
@RestController
@RequestMapping("/profile")
public class CustomerProfileController {

    @Autowired
    private CustomerProfileService service;
//    
//    @GetMapping("/all")
//    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
//    public List<CustomerProfile> getAllProfiles() {
//        return service.getAllProfiles();
//    }
    
    
    @GetMapping("/all")
    @PreAuthorize("hasRole('EMPLOYEE','ADMIN')")
    public Page<CustomerProfile> getAllCustomers(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            
            //Change by Tejas
    		@RequestParam(defaultValue = "desc") String sort) {

        return service.searchCustomers(keyword, page, size, sort);
    }

    
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping
    public CustomerProfile createProfile(
            @Valid @RequestBody CustomerProfileRequest request) {
  
    	try {
    		System.out.println(" createProfile : " + request);
    		System.out.println("Inside the create profile ");

            return service.createProfile(request);	
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(" err createProfile: " + e);
		}
		return null;
    	
    }

    
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/chart/gender")
    public List<GenderChartResponse> getGenderChart() {

        return service.getGenderChart();

    }
    
    @GetMapping("/{userId}")
    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    public CustomerProfile getProfile(
            @PathVariable Long userId) {

        return service.getProfile(userId);
    }
    
//    @PutMapping("/{userId}")
//    public CustomerProfile updateProfile(
//            @PathVariable Long userId,
//            @RequestBody CustomerProfileRequest request) {
//
//        return service.updateProfile(
//                userId,
//                request);
//    }
    
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/me")
    public CustomerProfile getMyProfile() {

        return service.getMyProfile();
    }
    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/me")
    public CustomerProfile updateMyProfile(
            @Valid @RequestBody CustomerProfileRequest request) {
    	
    	System.out.println("Inside the update profile ");

        return service.updateMyProfile(request);
    }
    
    
}
