package com.bank.account.security;


import java.util.Date;

import javax.crypto.SecretKey;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

	private static final String SECRET =
            "mySecretKeyForJwtAuthenticationBankingProject123456";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(long userId,String username,String role) {

        return Jwts.builder()
                .subject(username)
                .claim("role",role)
                .claim("userId", userId)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis()
                                + 1000 * 60 * 60*24)
                )
                .signWith(key)
                .compact();
    }
    
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public String extractUsername(String token) {

        return extractAllClaims(token)
                .getSubject();
    }
    public String extractRole(String token) {

        return extractAllClaims(token)
                .get("role", String.class);
    }
    public Long extractUserId(String token) {

        return extractAllClaims(token)
                .get("userId", Long.class);
    }
    
    public boolean validateToken(String token) {

        try {

            extractAllClaims(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
// public String extractUsername(String token);
// public String extractRole(String token);
// public boolean validateToken(String token);
}


