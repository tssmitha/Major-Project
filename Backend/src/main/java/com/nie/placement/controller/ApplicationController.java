package com.nie.placement.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nie.placement.dto.ApplicationRequest;
import com.nie.placement.dto.ApplicationResponse;
import com.nie.placement.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
	@Autowired
	private ApplicationService applicationService;
	
	@PostMapping
	public ApplicationResponse createApplication(@Valid @RequestBody ApplicationRequest application) {
		return applicationService.createApplication(application);
	}
	
	@GetMapping
	public List<ApplicationResponse> getAllApplications() {
		return applicationService.getAllApplications();
	}
	
	@GetMapping("/{id}")
	public ApplicationResponse getApplicationById(@PathVariable UUID id) {
		return applicationService.getApplicationById(id);
	}
}

