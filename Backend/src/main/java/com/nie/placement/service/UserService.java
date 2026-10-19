package com.nie.placement.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.nie.placement.dto.LoginRequest;
import com.nie.placement.dto.LoginResponse;
import com.nie.placement.dto.UserRequest;
import com.nie.placement.dto.UserResponse;
import com.nie.placement.entity.User;
import com.nie.placement.enums.Roles.Role;
import com.nie.placement.repository.UserRepository;
import com.nie.placement.security.JwtService;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	public UserResponse createUser(UserRequest request) {
		  User user = new User();

		    user.setEmail(request.getEmail());
		    user.setPassword(passwordEncoder.encode(request.getPassword()));
		    user.setRole(Role.Student);
		    user.setCreatedAt(LocalDateTime.now());

		    User savedUser = userRepository.save(user);

		    return new UserResponse(
		        savedUser.getId(),
		        savedUser.getEmail(),
		        savedUser.getRole()
		    );
	}
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public User getUserById(@PathVariable UUID id) {
		return userRepository.findById(id).orElse(null);
	}
	
	public LoginResponse login(LoginRequest request) {
	    User user = userRepository.findByEmail(request.getEmail())
	        .orElseThrow(() -> new RuntimeException("Invalid email or password"));

	    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
	        throw new RuntimeException("Invalid email or password");
	    }
	    
	    String token = jwtService.generateToken(user);

	    return new LoginResponse(
	        user.getId(),
	        user.getEmail(),
	        user.getRole(),
	        token
	    );
	}
}
