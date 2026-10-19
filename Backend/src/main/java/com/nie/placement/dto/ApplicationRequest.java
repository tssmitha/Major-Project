package com.nie.placement.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {
	@NotNull
	private UUID studentId;
	
	@NotNull
	private UUID driveId;
}
