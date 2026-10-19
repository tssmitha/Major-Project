package com.nie.placement.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.nie.placement.enums.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {
	private UUID id;
	private UUID studentId;
	private UUID driveId;
	 private String companyName;
	    private String role;
	private ApplicationStatus currentStatus;
	private LocalDateTime appliedAt;
}
