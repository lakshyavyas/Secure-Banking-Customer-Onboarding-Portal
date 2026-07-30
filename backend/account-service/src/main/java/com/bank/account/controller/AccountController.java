
//package com.bank.account.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.bank.account.dto.OpenAccountRequest;
//import com.bank.account.entity.Account;
//import com.bank.account.service.AccountService;
//
//@RestController
//@RequestMapping("/accounts")
//public class AccountController {
//
//    @Autowired
//    private AccountService service;
//
//    @GetMapping
//    public List<Account> getAllAccounts() {
//    	
//    	return service.getAllAccounts();
//    }
//    @PostMapping("/open")
//    public Account openAccount(
//            @RequestBody OpenAccountRequest request) {
//
//        return service.openAccount(request);
//    }
//    
//    @GetMapping("/user/{userId}")
//    public Account getAccountByUserId(
//            @PathVariable Long userId) {
//
//        return service.getAccountByUserId(userId);
//    }
//    
//    
//    @PutMapping("/{accountId}/block")
//    public Account blockAccount(
//            @PathVariable Long accountId) {
//
//        return service.blockAccount(accountId);
//    }
//    
//    @PutMapping("/{accountId}/close")
//    public Account closeAccount(
//            @PathVariable Long accountId) {
//
//        return service.closeAccount(accountId);
//    }
//}


package com.bank.account.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.account.dto.AccountTypeChartResponse;
import com.bank.account.dto.OpenAccountRequest;
import com.bank.account.entity.Account;
import com.bank.account.entity.RejectAccountRequest;
import com.bank.account.service.AccountService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    // =====================================================
    // CUSTOMER APIs
    // =====================================================

    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/open")
    public Account openAccount(
            @Valid @RequestBody OpenAccountRequest request) {

        return service.openAccount(request);
    }

    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/me")
    public List<Account> getMyAccounts() {

        return service.getMyAccounts();
    }

    // =====================================================
    // EMPLOYEE / ADMIN APIs
    // =====================================================

    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @GetMapping("/user/{userId}")
    public List<Account> getAccountsByUser(
            @PathVariable Long userId) {

        return service.getAccountsByUserId(userId);
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @PutMapping("/{accountId}/block")
    public Account blockAccount(
            @PathVariable Long accountId) {

        return service.blockAccount(accountId);
    }

    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @PutMapping("/{accountId}/close")
    public Account closeAccount(
            @PathVariable Long accountId) {

        return service.closeAccount(accountId);
    }
    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @GetMapping("/pending")
    public List<Account> getPendingAccounts() {

        return service.getPendingAccounts();
    }
    //Account ID SE HIT 
    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @PutMapping("/{id}/approve")
    public Account approveAccount(
            @PathVariable Long id) {

        return service.approveAccount(id);
    }
    
    
    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @PutMapping("/{id}/reject")
    public Account rejectAccount(
            @PathVariable Long id,
            @RequestBody RejectAccountRequest request) {

        return service.rejectAccount(id, request.getReason());
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/chart/account-types")
    public List<AccountTypeChartResponse> getAccountTypeChart() {

        return service.getAccountTypeChart();

    }
    // =====================================================
    // ADMIN ONLY
    // =====================================================

//    @PreAuthorize("hasRole('ADMIN')")
    @PreAuthorize("hasAnyRole('EMPLOYEE','ADMIN')")
    @GetMapping("/all")
    public List<Account> getAllAccounts() {

        return service.getAllAccounts();
    }
}



