package com.bank.customer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bank.customer.entity.CustomerProfile;

@Repository
public interface CustomerProfileRepository
        extends JpaRepository<CustomerProfile, Long> {

    Optional<CustomerProfile> findByUserId(Long userId);

    @Query("""
    SELECT c
    FROM CustomerProfile c
    WHERE
    LOWER(c.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(c.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
    OR c.mobile LIKE CONCAT('%', :keyword, '%')
    """)
    Page<CustomerProfile> searchCustomers(
            @Param("keyword") String keyword,
           Pageable pageable);

    
    @Query("""
    		SELECT c.gender, COUNT(c)
    		FROM CustomerProfile c
    		GROUP BY c.gender
    		""")
    		List<Object[]> getGenderDistribution();
  
    
}