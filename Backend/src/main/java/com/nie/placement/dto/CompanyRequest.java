package com.nie.placement.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

import com.nie.placement.enums.Industry;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {
	@NotBlank
	private String name;
	
	@NotBlank
	@Email
	private String contactEmail;
	
	private String website;
	
	private String logo;
	
	@NotBlank
	private String description;
	
	@NotNull
	private Industry industry;
	

	private String hrName;
	
	private String hrContact;
}
