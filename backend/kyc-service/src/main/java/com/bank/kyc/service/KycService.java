package com.bank.kyc.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.bank.kyc.dto.CustomerProfileResponse;
import com.bank.kyc.dto.KycRequest;
import com.bank.kyc.dto.KycStatusChartResponse;
import com.bank.kyc.dto.PendingKycResponse;
import com.bank.kyc.entity.KycRecord;
import com.bank.kyc.enums.KycStatus;
import com.bank.kyc.repository.KycRepository;
import com.bank.kyc.storage.FileStorageService;
import com.bank.kyc.util.VerhoeffValidator;


@Service
public class KycService {

	private static final String PAN_FOLDER = "uploads/pan/";

	private static final String AADHAAR_FOLDER = "uploads/aadhaar/";
	
    @Autowired
    private KycRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private FileStorageService fileStorageService;
    
    @Autowired
    private RestTemplate restTemplate;

    public KycRecord submitKyc(KycRequest request,MultipartFile panFile,MultipartFile aadhaarFile) {
        System.out.println("====== submitKyc() called ======");
        
        System.out.println("PAN File = " + panFile.getOriginalFilename());
        System.out.println("PAN Size = " + panFile.getSize());

        System.out.println("AADHAAR File = " + aadhaarFile.getOriginalFilename());
        System.out.println("AADHAAR Size = " + aadhaarFile.getSize());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getDetails();
        CustomerProfileResponse profile = getCustomerProfile();

//        if (profile == null || !profile.getProfileCompleted()) {
//            throw new RuntimeException("Please complete your profile before submitting KYC.");
//        }
        if (profile == null || !Boolean.TRUE.equals(profile.getProfileCompleted())) {
            throw new RuntimeException("Please complete your profile before submitting KYC.");
        }

        if (!VerhoeffValidator.validate(request.getAadhaarNumber())) {
            throw new IllegalArgumentException("Invalid Aadhaar Number. Verhoeff checksum validation failed.");
        }

        
        System.out.println("UserId from JWT = " + userId);
        String panFileName;
        String aadhaarFileName;

        try {

            panFileName =
                    fileStorageService.savePanFile(
                            panFile,
                            userId);

            aadhaarFileName =
                    fileStorageService.saveAadhaarFile(
                            aadhaarFile,
                            userId);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Unable to save uploaded documents.");
        }

        if (repository.findByUserId(userId).isPresent()) {
            throw new RuntimeException("KYC already submitted");
        }

        KycRecord record = new KycRecord();
        record.setUserId(userId);
        record.setAadhaarNumber(request.getAadhaarNumber());
        record.setPanNumber(request.getPanNumber());
        record.setAddress(request.getAddress());
        record.setStatus(KycStatus.PENDING);
        record.setSubmittedAt(LocalDateTime.now());
        
        record.setPanFileName(panFileName);

        record.setAadhaarFileName(aadhaarFileName);

        return repository.save(record);
    }

    public KycRecord getMyKyc() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getDetails();

        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("KYC not found"));
    }

    public KycRecord getKycByUserId(Long userId) {
        return repository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("KYC Not Found"));
    }

//    public List<KycRecord> getPendingKycs() {
//        return repository.findByStatus(KycStatus.PENDING);
//    }
    
    
//    public List<PendingKycResponse> getPendingKycs() {
//
//        List<KycRecord> records =
//                repository.findByStatus(KycStatus.PENDING);
//
//        List<PendingKycResponse> response = new ArrayList<>();
//
//        for (KycRecord record : records) {
//
//            CustomerProfileResponse profile =
//                    getCustomerProfile(record.getUserId());
//
//            PendingKycResponse dto =
//                    new PendingKycResponse();
//
//            dto.setKycId(record.getKycId());
//            dto.setUserId(record.getUserId());
//
//            dto.setCustomerName(
//                    profile.getFirstName() + " " + profile.getLastName());
//
//            dto.setAadhaarNumber(record.getAadhaarNumber());
//            dto.setPanNumber(record.getPanNumber());
//            dto.setStatus(record.getStatus());
//
//            response.add(dto);
//        }
//
//        return response;
//    }
    
    
    


    public Page<PendingKycResponse> getPendingKycs(
            int page,
            int size,
            String keyword) {

        Pageable pageable = PageRequest.of(page, size);

        Page<KycRecord> records =
                repository.searchPendingKyc(
                        KycStatus.PENDING,
                        keyword,
                        pageable);

        return records.map(record -> {

            CustomerProfileResponse profile =
                    getCustomerProfile(record.getUserId());

            PendingKycResponse dto =
                    new PendingKycResponse();

            dto.setKycId(record.getKycId());
            dto.setUserId(record.getUserId());

            dto.setCustomerName(
                    profile.getFirstName() + " " + profile.getLastName());

            dto.setAadhaarNumber(record.getAadhaarNumber());
            dto.setPanNumber(record.getPanNumber());
            dto.setStatus(record.getStatus());

            return dto;
        });
    }
    
    
    
    
    
    
    //Overloaded method
    private CustomerProfileResponse getCustomerProfile(Long userId) {

        HttpHeaders headers = new HttpHeaders();

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String token =
                (String) authentication.getCredentials();

        headers.setBearerAuth(token);

        HttpEntity<Void> entity =
                new HttpEntity<>(headers);

        ResponseEntity<CustomerProfileResponse> response =
                restTemplate.exchange(
                        "http://localhost:8082/profile/" + userId,
                        HttpMethod.GET,
                        entity,
                        CustomerProfileResponse.class);

        return response.getBody();
    }
    
    

    public KycRecord approveKyc(Long kycId) {
        KycRecord record = repository.findById(kycId)
                .orElseThrow(() -> new RuntimeException("KYC Not Found"));

        if (record.getStatus() != KycStatus.PENDING) {
            throw new RuntimeException("KYC already processed");
        }

        record.setStatus(KycStatus.APPROVED);
        record.setApprovedAt(LocalDateTime.now());
        KycRecord savedRecord = repository.save(record);

        // Fetch user email and trigger async email notification
        String customerEmail = fetchCustomerEmail(record.getUserId());
        emailService.sendKycStatusEmail(customerEmail, "Valued Customer", "APPROVED", null);

        return savedRecord;
    }

    public KycRecord rejectKyc(Long kycId, String remarks) {
        KycRecord record = repository.findById(kycId)
                .orElseThrow(() -> new RuntimeException("KYC Not Found"));

        if (record.getStatus() != KycStatus.PENDING) {
            throw new RuntimeException("KYC already processed");
        }

        record.setStatus(KycStatus.REJECTED);
        record.setRemarks(remarks);
        record.setApprovedAt(LocalDateTime.now());
        KycRecord savedRecord = repository.save(record);

        // Fetch user email and trigger async email notification
        String customerEmail = fetchCustomerEmail(record.getUserId());
        emailService.sendKycStatusEmail(customerEmail, "Valued Customer", "REJECTED", remarks);

        return savedRecord;
    }

    public List<KycRecord> getAllKycs() {
        return repository.findAll();
    }

    /**
     * Helper method to retrieve user's email address.
     * Tries inter-service REST call first; falls back to default if unavailable.
     */
    private String fetchCustomerEmail(Long userId) {
        try {
            if (restTemplate != null) {
                // Adjust endpoint URL according to your auth-service/customer-profile-service routing
                String response = restTemplate.getForObject("http://localhost:8081/auth/user/" + userId + "/email", String.class);
                if (response != null && !response.isEmpty()) {
                    return response;
                }
            }
        } catch (Exception e) {
            System.err.println("Could not fetch email from auth-service, using default/fallback logic: " + e.getMessage());
        }
        // Fallback default email structure if microservice REST lookup is not configured
        return "jai565dev@gmail.com"; 
    }
//    public ResponseEntity<Resource> viewPan(Long userId) {
//
//        try {
//
//            System.out.println("Requested UserId = " + userId);
//
//            KycRecord record =
//                    repository.findByUserId(userId)
//                            .orElseThrow(() ->
//                                    new RuntimeException("KYC not found"));
//
//            System.out.println("DB UserId = " + record.getUserId());
//            System.out.println("PAN File Name = " + record.getPanFileName());
//
//            Path path = Paths.get(PAN_FOLDER)
//                    .resolve(record.getPanFileName());
//
//            System.out.println("Absolute Path = " + path.toAbsolutePath());
//            System.out.println("Exists = " + Files.exists(path));
//
//            Resource resource = new UrlResource(path.toUri());
//
//            if (!resource.exists()) {
//                throw new RuntimeException("PAN file not found");
//            }
//
//            String contentType = Files.probeContentType(path);
//
//            if (contentType == null) {
//                contentType = "application/pdf";
//            }
//
//            System.out.println("Content Type = " + contentType);
//
//            return ResponseEntity.ok()
//                    .contentType(MediaType.parseMediaType(contentType))
//                    .header(
//                            HttpHeaders.CONTENT_DISPOSITION,
//                            "inline; filename=\"" + record.getPanFileName() + "\"")
//                    .body(resource);
//
//        } catch (Exception e) {
//
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
    
    
    public ResponseEntity<byte[]> viewPan(Long userId) {

        try {

            KycRecord record = repository.findByUserId(userId)
                    .orElseThrow(() -> new RuntimeException("KYC not found"));

            Path path = Paths.get(PAN_FOLDER)
                    .resolve(record.getPanFileName());

            byte[] bytes = Files.readAllBytes(path);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + record.getPanFileName() + "\"")
                    .body(bytes);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
//    public ResponseEntity<Resource> viewAadhaar(Long userId) {
//
//        try {
//
//            KycRecord record =
//                    repository.findByUserId(userId)
//                            .orElseThrow(() ->
//                                    new RuntimeException("KYC not found"));
//
//            Path path =
//                    Paths.get(AADHAAR_FOLDER)
//                            .resolve(record.getAadhaarFileName());
//
//            Resource resource =
//                    new UrlResource(path.toUri());
//
//            if (!resource.exists()) {
//                throw new RuntimeException("AADHAAR file not found");
//            }
//
//            return ResponseEntity.ok()
//                    .header(
//                            HttpHeaders.CONTENT_DISPOSITION,
//                            "inline; filename=\"" +
//                                    record.getAadhaarFileName() + "\"")
//                    .body(resource);
//
//        } catch (Exception e) {
//
//            throw new RuntimeException(e.getMessage());
//        }
//    }
    public ResponseEntity<byte[]> viewAadhaar(Long userId) {

        try {

            KycRecord record = repository.findByUserId(userId)
                    .orElseThrow(() ->
                            new RuntimeException("KYC not found"));

            Path path = Paths.get(AADHAAR_FOLDER)
                    .resolve(record.getAadhaarFileName());

            if (!Files.exists(path)) {
                throw new RuntimeException("Aadhaar file not found");
            }

            byte[] bytes = Files.readAllBytes(path);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + record.getAadhaarFileName() + "\"")
                    .body(bytes);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
    
    private CustomerProfileResponse getCustomerProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String token = (String) authentication.getCredentials();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<CustomerProfileResponse> response =
                restTemplate.exchange(
                        "http://localhost:8082/profile/me",
                        HttpMethod.GET,
                        entity,
                        CustomerProfileResponse.class
                );

        return response.getBody();
    }
    
    public List<KycStatusChartResponse> getKycStatusChart() {

        List<Object[]> result = repository.getKycStatusDistribution();

        List<KycStatusChartResponse> response = new ArrayList<>();

        for (Object[] row : result) {

            String status = row[0].toString();

            Long count = (Long) row[1];

            response.add(
                    new KycStatusChartResponse(
                            status,
                            count
                    )
            );

        }

        return response;

    }
    
}