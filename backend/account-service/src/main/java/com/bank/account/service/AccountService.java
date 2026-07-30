//
//package com.bank.account.service;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Service;
//
//import com.bank.account.dto.OpenAccountRequest;
//import com.bank.account.entity.Account;
//import com.bank.account.enums.AccountStatus;
//import com.bank.account.repository.AccountRepository;
//
//@Service
//public class AccountService {
//
//    @Autowired
//    private AccountRepository repository;
//
//    public Account openAccount(
//            OpenAccountRequest request) {
//    	
//    	Authentication authentication =
//    	        SecurityContextHolder.getContext().getAuthentication();
//
//    	Long userId = (Long) authentication.getDetails();
//
//        if(repository.findByUserId(
//                request.getUserId()).isPresent()) {
//
//            throw new RuntimeException(
//                    "Account already exists");
//        }
//
//        Account account = new Account();
//
//        account.setUserId(userId);
//
//        account.setAccountType(
//                request.getAccountType());
//
//        account.setBalance(
//                BigDecimal.ZERO);
//
//        account.setStatus(
//                AccountStatus.ACTIVE);
//
//        account.setCreatedAt(
//                LocalDateTime.now());
//
//        account.setAccountNumber(
//                generateAccountNumber());
//
//        return repository.save(account);
//    }
//
//    private Long generateAccountNumber() {
//
//        long base = 1000000000L;
//
//        long count = repository.count();
//
//        return base + count + 1;
//    }
//    
//    public List<Account> getAccountsByUserId(Long userId) {
//
//        return repository.findByUserId(userId)
//                .orElseThrow(() ->
//                        new RuntimeException(
//                                "Account Not Found"));
//    }
//    
//    public List<Account> getAllAccounts() {
//
//        return repository.findAll();
//    }
//    
//    public Account blockAccount(Long accountId) {
//
//        Account account =
//                repository.findById(accountId)
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Account Not Found"));
//
//        account.setStatus(
//                AccountStatus.BLOCKED);
//
//        return repository.save(account);
//    }
//    
//    public Account closeAccount(Long accountId) {
//
//        Account account =
//                repository.findById(accountId)
//                        .orElseThrow(() ->
//                                new RuntimeException(
//                                        "Account Not Found"));
//
//        account.setStatus(
//                AccountStatus.CLOSED);
//
//        return repository.save(account);
//    }
//}

package com.bank.account.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bank.account.dto.AccountTypeChartResponse;
import com.bank.account.dto.CustomerProfileResponse;
import com.bank.account.dto.KycResponse;
import com.bank.account.dto.OpenAccountRequest;
import com.bank.account.entity.Account;
import com.bank.account.enums.AccountStatus;
import com.bank.account.repository.AccountRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AccountService {
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private HttpServletRequest httpServletRequest;
	
    @Autowired
    private AccountRepository repository;

    //Helper method for httprequest
    private String getAuthorizationHeader() {

        return httpServletRequest.getHeader("Authorization");
    }
    //Build httprequest header
    private HttpHeaders createHeaders() {

        HttpHeaders headers = new HttpHeaders();

        headers.set(
                "Authorization",
                getAuthorizationHeader());

        return headers;
    }
    private CustomerProfileResponse getCustomerProfile() {

        HttpEntity<Void> entity =
                new HttpEntity<>(createHeaders());

        ResponseEntity<CustomerProfileResponse> response =
                restTemplate.exchange(
                        "http://localhost:8082/profile/me",
                        HttpMethod.GET,
                        entity,
                        CustomerProfileResponse.class);

        return response.getBody();
    }
    private KycResponse getCustomerKyc() {

        HttpEntity<Void> entity =
                new HttpEntity<>(createHeaders());

        ResponseEntity<KycResponse> response =
                restTemplate.exchange(
                        "http://localhost:8083/kyc/me",
                        HttpMethod.GET,
                        entity,
                        KycResponse.class);

        return response.getBody();
    }
    

    
    
    
 
 
    
    // ================================
    // CUSTOMER
    // ================================

    public Account openAccount(OpenAccountRequest request) {
    	CustomerProfileResponse profile =
    	        getCustomerProfile();

    	KycResponse kyc =
    	        getCustomerKyc();
    	
    	
    	if (profile == null || !profile.isProfileCompleted()) {
    	    throw new RuntimeException("Complete your profile first.");
    	}

    	if (kyc == null || !"APPROVED".equals(kyc.getStatus())) {
    	    throw new RuntimeException("Your KYC is not approved.");
    	}

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getDetails();

        if (repository.existsByUserIdAndAccountType(
                userId,
                request.getAccountType())) {

            throw new RuntimeException(
                    "You already have this type of account.");
        }

        Account account = new Account();

        account.setUserId(userId);

        account.setAccountType(
                request.getAccountType());

        BigDecimal initialBalance = request.getBalance() == null
                ? BigDecimal.ZERO
                : BigDecimal.valueOf(request.getBalance());

        account.setBalance(initialBalance);

        // Later this will become PENDING
        // after we add employee approval.
        account.setStatus(
                AccountStatus.PENDING);

        account.setCreatedAt(
                LocalDateTime.now());

        account.setAccountNumber(
                null);

        return repository.save(account);
    }

    public List<Account> getMyAccounts() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Long userId = (Long) authentication.getDetails();

        return repository.findByUserId(userId);
    }

    // ================================
    // EMPLOYEE / ADMIN
    // ================================

    public List<Account> getAccountsByUserId(
            Long userId) {

        return repository.findByUserId(userId);
    }

    public Account blockAccount(Long accountId) {

        Account account =
                repository.findById(accountId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Account Not Found"));

        account.setStatus(
                AccountStatus.BLOCKED);

        return repository.save(account);
    }

    public Account closeAccount(Long accountId) {

        Account account =
                repository.findById(accountId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Account Not Found"));

        account.setStatus(
                AccountStatus.CLOSED);

        return repository.save(account);
    }
    
    
    public List<Account> getPendingAccounts() {

        return repository.findByStatus(AccountStatus.PENDING);
    }
    
    //Approval of account
    
    public Account approveAccount(Long id) {

        Account account =
                repository.findById(id)
                        .orElseThrow(() ->
                            new RuntimeException("Account not found"));

        account.setStatus(AccountStatus.ACTIVE);

        account.setAccountNumber(1000000000L + account.getAccountId());

        account.setActivatedAt(LocalDateTime.now());

        return repository.save(account);
    }
    
    //Rejection of account
    public Account rejectAccount(Long id, String reason) {

        Account account =
                repository.findById(id)
                        .orElseThrow(() ->
                            new RuntimeException("Account not found"));

        account.setStatus(AccountStatus.REJECTED);

        account.setRemarks(reason);

        return repository.save(account);
    }
    
    
    public List<AccountTypeChartResponse> getAccountTypeChart() {

        List<Object[]> result =
                repository.getAccountTypeDistribution();

        List<AccountTypeChartResponse> response =
                new ArrayList<>();

        for (Object[] row : result) {

            response.add(

                    new AccountTypeChartResponse(

                            row[0].toString(),

                            (Long) row[1]

                    )

            );

        }

        return response;

    }
    

    // ================================
    // ADMIN
    // ================================

    public List<Account> getAllAccounts() {

        return repository.findAll();
    }
    
    
    
    

    // ================================
    // Utility
    // ================================
//
//    private Long generateAccountNumber() {
//
//        long base = 1000000000L;
//
//        long count = repository.count();
//
//        return base + count + 1;
//    }
}