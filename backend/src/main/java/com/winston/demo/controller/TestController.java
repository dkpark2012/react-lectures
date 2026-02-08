package com.winston.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // 리액트(Vite) 기본 포트 허용
public class TestController {

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, Spring Boot is here!";
    }
}
