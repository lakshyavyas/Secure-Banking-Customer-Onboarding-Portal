package com.bank.account.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bank.account.entity.Account;
import com.bank.account.enums.AccountStatus;
import com.bank.account.enums.AccountType;

public interface AccountRepository
        extends JpaRepository<Account, Long> {

	List<Account> findByStatus(AccountStatus status);
    List<Account> findByUserId(Long userId);

    boolean existsByUserIdAndAccountType(
            Long userId,
            AccountType accountType);

    Optional<Account> findByAccountNumber(Long accountNumber);
    
    
    @Query("""
    		SELECT a.accountType, COUNT(a)
    		FROM Account a
    		GROUP BY a.accountType
    		""")
    		List<Object[]> getAccountTypeDistribution();
}