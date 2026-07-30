package com.bank.kyc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bank.kyc.entity.KycRecord;
import com.bank.kyc.enums.KycStatus;

@Repository
public interface KycRepository extends JpaRepository<KycRecord, Long> {

	Optional<KycRecord> findByUserId(Long userId);

	List<KycRecord> findByStatus(KycStatus status);
	
	@Query("""
			SELECT k
			FROM KycRecord k
			WHERE k.status = :status
			AND (
			LOWER(k.aadhaarNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))
			OR LOWER(k.panNumber) LIKE LOWER(CONCAT('%', :keyword, '%'))
			)
			""")
			Page<KycRecord> searchPendingKyc(
			        @Param("status") KycStatus status,
			        @Param("keyword") String keyword,
			        Pageable pageable);
	
	
	
	@Query("""
			SELECT k.status, COUNT(k)
			FROM KycRecord k
			GROUP BY k.status
			""")
			List<Object[]> getKycStatusDistribution();
}
