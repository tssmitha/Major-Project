package com.nie.placement.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nie.placement.dto.DriveRequest;
import com.nie.placement.dto.DriveResponse;
import com.nie.placement.entity.Drive;
import com.nie.placement.service.DriveService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/drives")
public class DriveController {
	@Autowired
	private DriveService driveService;
	
	@PostMapping
	public DriveResponse createDrive(@Valid @RequestBody DriveRequest request) {
		return driveService.createDrive(request);
	}
	
	@GetMapping
	public List<DriveResponse> getDrives() {
		return driveService.getDrives();
	}
	
	@GetMapping("/{id}")
	public DriveResponse getdrive(@PathVariable UUID id) {
		return driveService.getDriveById(id);
	}
	
	@PatchMapping("/{id}/publish")
	public DriveResponse publishDrive(@PathVariable UUID id) {
	    return driveService.publishDrive(id);
	}
	
	@GetMapping("/published")
	public List<DriveResponse> getPublishedDrives() {
	    return driveService.getPublishedDrives();
	}
}
