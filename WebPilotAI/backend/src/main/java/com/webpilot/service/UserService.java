package com.webpilot.service;

import com.webpilot.entity.User;

import java.util.List;

public interface UserService {

    User save(User user);

    User findById(Long id);

    List<User> findAll();

}