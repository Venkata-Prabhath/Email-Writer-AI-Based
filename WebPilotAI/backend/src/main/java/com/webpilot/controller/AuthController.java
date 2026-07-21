package com.webpilot.controller;

import com.webpilot.entity.User;
import com.webpilot.entity.enums.UserRole;
import com.webpilot.repository.UserRepository;
import com.webpilot.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Added 'name' to the request record
    public record LoginRequest(String name, String email, String password) {}

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody LoginRequest request) {
        User user = new User();
        user.setName(request.name()); // Now explicitly setting the name
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        // Ensure role is not null to prevent database constraints
        user.setRole(UserRole.USER);

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());
        return Collections.singletonMap("token", token);
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        String token = jwtService.generateToken(request.email());
        return Collections.singletonMap("token", token);
    }
}