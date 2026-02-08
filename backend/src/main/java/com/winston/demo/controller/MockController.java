package com.winston.demo.controller;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Vite 기본 포트
public class MockController {
    
    // Step 1-2용
    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
    
    // Step 3-4용
    @GetMapping("/users")
    public List<Map<String, Object>> getUsers() {
        return Arrays.asList(
            Map.of("id", 1, "name", "김철수", "email", "kim@example.com", "age", 30),
            Map.of("id", 2, "name", "이영희", "email", "lee@example.com", "age", 25),
            Map.of("id", 3, "name", "박민수", "email", "park@example.com", "age", 28)
        );
    }
    
    // Step 6-10용
    @PostMapping("/users")
    public Map<String, Object> createUser(@RequestBody Map<String, Object> user) {
        user.put("id", new Random().nextInt(1000));
        return user;
    }
    
    @PutMapping("/users/{id}")
    public Map<String, Object> updateUser(@PathVariable int id, @RequestBody Map<String, Object> user) {
        user.put("id", id);
        return user;
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        return ResponseEntity.ok().build();
    }
    
    // Step 5용
    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        return Map.of(
            "isOnline", true,
            "serverTime", LocalDateTime.now().toString(),
            "users", 42
        );
    }
}