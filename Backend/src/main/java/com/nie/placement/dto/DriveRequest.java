package com.nie.placement.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.nie.placement.enums.Branch;
import com.nie.placement.enums.DriveMode;
import com.nie.placement.enums.EmploymentType;
import com.nie.placement.enums.Industry;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DriveRequest {
	 	@NotBlank
	    private String role;

	    @NotNull
	    private Double ctc;

	    @NotNull
	    private Double minCgpa;

	    @NotNull
	    private UUID companyId;

	    private String location;

	    private List<Branch> eligibleBranches;

	    private LocalDate releaseDate;

	    private LocalDate lastDateToApply;
	    
	    private Integer batch;

	    private Integer activeBacklogs;

	    private EmploymentType employmentType;

	    private DriveMode driveMode;

	    private String venueOrLink;

	    private String jobSummary;

	    private String skills;

	    private String additionalInstructions;

	    private String jobDescriptionUrl;
}
