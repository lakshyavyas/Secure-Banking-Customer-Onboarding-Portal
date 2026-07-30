package com.bank.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bank.auth.dto.ChangePasswordRequest;
import com.bank.auth.dto.CustomerRegisterRequest;
import com.bank.auth.dto.EmployeeRequest;
import com.bank.auth.entity.Role;
import com.bank.auth.entity.User;
import com.bank.auth.repository.UserRepository;
import com.bank.auth.security.LoginRateLimiterService;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LoginRateLimiterService rateLimiterService;

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Authenticates user with Redis rate-limiting (3 failed attempt lockout).
     */
    public boolean login(String username, String password) {

        // 1. Check DB first before incrementing Redis counters
        User user = userRepository.findByUsername(username).orElse(null);

        // If user does not exist or is disabled, stop early without incrementing Redis
        if (user == null || !user.isEnabled()) {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED, 
                "Invalid credentials"
            );
        }

        // 2. Check if the existing user is currently locked out in Redis
        if (rateLimiterService.isLocked(username)) {
            long minutesLeft = rateLimiterService.getRemainingLockTime(username);
            throw new ResponseStatusException(
                HttpStatus.LOCKED,
                "Account is locked due to multiple failed attempts. Please try again after " + minutesLeft + " minutes."
            );
        }

        // 3. Verify Password for existing user
        boolean matches = passwordEncoder.matches(password, user.getPassword());

        if (matches) {
            // SUCCESS: Reset Redis attempts counter
            rateLimiterService.resetAttempts(username);
            return true;
        } else {
            // FAILURE: Increment Redis counter ONLY for valid existing users
            handleFailedAttempt(username);
            return false;
        }
    }

    private void handleFailedAttempt(String username) {
        int attemptsRemaining = rateLimiterService.recordFailedAttempt(username);
        if (attemptsRemaining <= 0) {
            throw new ResponseStatusException(
                HttpStatus.LOCKED,
                "Maximum 3 failed attempts reached. Account locked for 15 minutes!"
            );
        } else {
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Invalid credentials. You have " + attemptsRemaining + " attempts remaining."
            );
        }
    }

    public User getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElse(null);
    }

    public User createEmployee(EmployeeRequest request) {
        User employee = new User();
        employee.setUsername(request.getUsername());
        employee.setPassword(passwordEncoder.encode(request.getPassword()));
        employee.setRole(Role.EMPLOYEE);
        employee.setEnabled(true);

        return userRepository.save(employee);
    }

    public List<User> getAllEmployees() {
        return userRepository.findByRole(Role.EMPLOYEE);
    }

    public User disableEmployee(Long id) {
        User employee = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        employee.setEnabled(false);
        return userRepository.save(employee);
    }

    public User enableEmployee(Long id) {
        User employee = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        employee.setEnabled(true);
        return userRepository.save(employee);
    }

    public User getEmployee(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    public User resetPassword(Long id, String newPassword) {
        User employee = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        employee.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(employee);
    }

    public User registerCustomer(CustomerRegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        User customer = new User();
        customer.setUsername(request.getUsername());
        customer.setPassword(passwordEncoder.encode(request.getPassword()));
        customer.setRole(Role.CUSTOMER);
        customer.setEnabled(true);
        customer.setPasswordChanged(false);

        return userRepository.save(customer);
    }
    
    public void changePassword(ChangePasswordRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword())) {

            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        user.setPasswordChanged(true);

        userRepository.save(user);
    }
}