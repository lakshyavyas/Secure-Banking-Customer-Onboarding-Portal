package com.bank.auth.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class LoginRateLimiterService {

    private final StringRedisTemplate redisTemplate;

    @Value("${app.security.max-login-attempts:3}")
    private int maxAttempts;

    @Value("${app.security.lock-duration-minutes:15}")
    private long lockDurationMinutes;

    public LoginRateLimiterService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // Key prefixes to categorize data in Redis
    private static final String ATTEMPTS_PREFIX = "login_attempts:";
    private static final String LOCK_PREFIX = "account_locked:";

    /**
     * Checks if the user is currently locked out in Redis.
     */
    public boolean isLocked(String username) {
        String lockKey = LOCK_PREFIX + username.toLowerCase();
        return Boolean.TRUE.equals(redisTemplate.hasKey(lockKey));
    }

    /**
     * Returns remaining lockout time in minutes.
     */
    public long getRemainingLockTime(String username) {
        String lockKey = LOCK_PREFIX + username.toLowerCase();
        Long expireSeconds = redisTemplate.getExpire(lockKey, TimeUnit.SECONDS);
        return (expireSeconds != null && expireSeconds > 0) ? (expireSeconds / 60) + 1 : 0;
    }

    /**
     * Registers a failed login attempt. If attempts reach the threshold,
     * locks the user out with a TTL (Time-To-Live).
     */
    public int recordFailedAttempt(String username) {
        String key = ATTEMPTS_PREFIX + username.toLowerCase();
        String lockKey = LOCK_PREFIX + username.toLowerCase();

        // Increment attempt count atomically in Redis
        Long attempts = redisTemplate.opsForValue().increment(key);

        if (attempts != null && attempts >= maxAttempts) {
            // Lock the user for 15 minutes automatically using Redis TTL
            redisTemplate.opsForValue().set(lockKey, "LOCKED", lockDurationMinutes, TimeUnit.MINUTES);
            redisTemplate.delete(key); // Reset counter after locking
            return 0; // 0 attempts remaining
        }

        // Set counter TTL to 1 hour (clears stagnant failed attempts automatically)
        redisTemplate.expire(key, 1, TimeUnit.HOURS);
        return (int) (maxAttempts - (attempts != null ? attempts : 0));
    }

    /**
     * Resets failed attempts upon successful login.
     */
    public void resetAttempts(String username) {
        String key = ATTEMPTS_PREFIX + username.toLowerCase();
        redisTemplate.delete(key);
    }
}