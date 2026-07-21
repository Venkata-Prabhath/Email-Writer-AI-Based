package com.webpilot.service;

import com.webpilot.dto.auth.LoginRequest;
import com.webpilot.dto.auth.LoginResponse;
import com.webpilot.dto.auth.RegisterRequest;
import com.webpilot.dto.auth.RegisterResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    RegisterResponse register(RegisterRequest request);

}