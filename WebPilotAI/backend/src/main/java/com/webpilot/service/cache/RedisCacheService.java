package com.webpilot.service.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisCacheService {

    private final StringRedisTemplate redisTemplate;

    public void save(String key, String value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }

    public boolean exists(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    // -----------------------------
    // Gemini Cache
    // -----------------------------

    public void savePromptResponse(String promptHash, String response) {
        save("gemini:" + promptHash, response, Duration.ofMinutes(30));
    }

    public String getPromptResponse(String promptHash) {
        return get("gemini:" + promptHash);
    }

    // -----------------------------
    // Task Status Cache
    // -----------------------------

    public void saveTaskStatus(Long taskId, String status) {
        save("task:" + taskId, status, Duration.ofDays(2));
    }

    public String getTaskStatus(Long taskId) {
        return get("task:" + taskId);
    }

    public void removeTaskStatus(Long taskId) {
        delete("task:" + taskId);
    }
}