package com.nie.placement.entity;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.nie.placement.enums.Branch;
import com.nie.placement.enums.DriveMode;
import com.nie.placement.enums.DriveStatus;
import com.nie.placement.enums.EmploymentType;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "drive")

@Getter 
@Setter
@NoArgsConstructor                         
@AllArgsConstructor                         
@Builder
public class Drive {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@Column(nullable = false)
	private String role;
	
	@Column(nullable = false)
	private Double ctc;
	
	@Column(nullable = false)
	private Double minCgpa;
	
	@Column
	private String location;
	
	private Integer batch;

	private Integer activeBacklogs;

	@Enumerated(EnumType.STRING)
	private EmploymentType employmentType;

	@Enumerated(EnumType.STRING)
	private DriveMode driveMode;

	private String venueOrLink;

	@Column(length = 2000)
	private String jobSummary;

	@Column(length = 1000)
	private String skills;

	@Column(length = 3000)
	private String additionalInstructions;

	private String jobDescriptionUrl;
	
	@ElementCollection
	@Enumerated(EnumType.STRING)
	private List<Branch> eligibleBranches;
	
	@ManyToOne
	@JoinColumn(name = "company_id",nullable = false)
	private Company company; 
	
	@Column
	private LocalDate releaseDate;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	@Builder.Default
	private DriveStatus status = DriveStatus.DRAFT;
	
	@Column
	private LocalDate lastDateToApply;
	
}
