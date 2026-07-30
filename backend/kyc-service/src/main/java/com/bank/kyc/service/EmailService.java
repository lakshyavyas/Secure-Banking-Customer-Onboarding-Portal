package com.bank.kyc.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    

    // @Async ensures sending the email doesn't block or slow down the API response time!
    @Async
    public void sendKycStatusEmail(String toEmail, String customerName, String status, String remarks) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("jai565dev@gmail.com");
            message.setTo(toEmail);
            
            if ("APPROVED".equalsIgnoreCase(status)) {
                message.setSubject("Your Banking KYC Verification is Approved!");
                message.setText("Dear " + customerName + ",\n\n" +
                        "Great news! Your KYC documents have been successfully verified and APPROVED.\n" +
                        "You can now log in to your account and open savings or current accounts.\n\n" +
                        "Thank you for choosing our Bank.\nBest Regards,\nBanking Team");
            } else {
                message.setSubject("Update Regarding Your Banking KYC Verification");
                message.setText("Dear " + customerName + ",\n\n" +
                        "We regret to inform you that your KYC verification was REJECTED.\n" +
                        "Reason: " + remarks + "\n\n" +
                        "Please log in to your dashboard and re-submit valid documents.\n\n" +
                        "Best Regards,\nBanking Team");
            }

            mailSender.send(message);
            System.out.println("KYC Status Email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
        }
    }
}