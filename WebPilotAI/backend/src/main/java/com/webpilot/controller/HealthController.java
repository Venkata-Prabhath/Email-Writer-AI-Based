package com.webpilot.controller;

import com.webpilot.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HealthController {

    private final TaskRepository taskRepository;

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, String>> health() {
        try {
            taskRepository.count(); // Verify DB connection
            return ResponseEntity.ok(Map.of("status", "UP", "service", "WebPilot Backend"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(Map.of("status", "DOWN", "error", "Database Unreachable"));
        }
    }
}