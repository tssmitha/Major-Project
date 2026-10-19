package com.nie.placement.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nie.placement.dto.ApplicationResponse;
import com.nie.placement.dto.StudentRequest;
import com.nie.placement.dto.StudentResponse;
import com.nie.placement.entity.Student;
import com.nie.placement.service.ApplicationService;
import com.nie.placement.service.StudentService;

@RestController
public class StudentController {
	@Autowired 
	private StudentService studentService;
	
	@Autowired
	private ApplicationService applicationService;
	
	@GetMapping("/students")
	public List<Student> testUser() {
		return studentService.getStudents();
	}
	
	@PostMapping("/students")
	public StudentResponse createUser(@RequestBody StudentRequest request) {
		return studentService.createStudent(request);
	}
	
	@GetMapping("/students/{id}")
	public Student getUser(@PathVariable UUID id) {
		return studentService.getStudentByid(id);
	}
	
	@PutMapping("/students/{id}")
	public StudentResponse updateStudent(@RequestBody StudentRequest request, @PathVariable UUID id) {
		return studentService.updateStudent(request, id);
	}
	
	@GetMapping("/profile")
	public StudentResponse getProfile(Authentication authentication) {

	    String email = authentication.getName();

	    return studentService.getProfile(email);
	}
	
	@GetMapping("/profile/applications")
	public ResponseEntity<List<ApplicationResponse>>
	        getMyApplications(Authentication authentication) {

	    return ResponseEntity.ok(
	        applicationService.getApplicationsForStudent(
	            authentication.getName()
	        )
	    );
	}
	
}
