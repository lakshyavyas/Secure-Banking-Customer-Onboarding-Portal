package com.bank.auth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.bank.auth.dto.EmployeeRequest;
import com.bank.auth.dto.ResetPasswordRequest;
import com.bank.auth.entity.User;
import com.bank.auth.security.JwtUtil;
import com.bank.auth.service.UserService;

import jakarta.validation.Valid;
@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserService userService;

//	@PostMapping("/create")
//	public User createUser(@RequestBody User user) {
//		return userService.saveUser(user);
//	}


	
	@GetMapping("/test-token")
	public String testToken(
	        @RequestParam String token) {

	    return jwtUtil.extractUsername(token)
	            + " | "
	            + jwtUtil.extractRole(token);
	}
	@GetMapping("/hello")
	@PreAuthorize("hasRole('ADMIN')")
	public String hello() {

	    return "Welcome Admin";
	}
	
	@PostMapping("/create-employee")
	@PreAuthorize("hasRole('ADMIN')")
	public User createEmployee(
	        @Valid @RequestBody EmployeeRequest request) {

	    return userService.createEmployee(request);
	}
	
	@GetMapping("/employees")
	@PreAuthorize("hasRole('ADMIN')")
	public List<User> getEmployees() {

	    return userService.getAllEmployees();
	}
	
	
	@PutMapping("/employees/{id}/disable")
	@PreAuthorize("hasRole('ADMIN')")
	public User disableEmployee(
	        @PathVariable Long id) {

	    return userService.disableEmployee(id);
	}
	@PutMapping("/employees/{id}/enable")
	@PreAuthorize("hasRole('ADMIN')")
	public User enableEmployee(@PathVariable Long id) {

	    return userService.enableEmployee(id);
	}
	
	@GetMapping("/employees/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public User getEmployee(
	        @PathVariable Long id) {

	    return userService.getEmployee(id);
	}
	
	@PutMapping("/employees/{id}/reset-password")
	@PreAuthorize("hasRole('ADMIN')")
	public User resetPassword(
	        @PathVariable Long id,
	        @Valid @RequestBody ResetPasswordRequest request) {

	    return userService.resetPassword(
	            id,
	            request.getNewPassword());
	}
	
}