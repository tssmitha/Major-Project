package com.nie.placement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nie.placement.dto.LoginRequest;
import com.nie.placement.dto.LoginResponse;
import com.nie.placement.dto.UserRequest;
import com.nie.placement.dto.UserResponse;
import com.nie.placement.entity.User;
import com.nie.placement.service.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/user")
	public List<User> getUsers() {
		return userService.getUsers();
	}
	
	@PostMapping("/user")
	public UserResponse createUser(@Valid @RequestBody UserRequest request) {
	    return userService.createUser(request);
	}
	
	@PostMapping("/login")
	public LoginResponse login(@Valid @RequestBody LoginRequest request) {
	    return userService.login(request);
	}

}
