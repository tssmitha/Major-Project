package com.nie.placement.dto;

import java.util.UUID;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicRequest {
	 	@NotNull
	    @DecimalMin("0.0")
	    @DecimalMax("10.0")
	    private Double cgpa;
	 	
	 	@NotNull
	 	@Min(1)
	 	@Max(8)
	 	private Integer semester;

	    @NotNull
	    @Min(0)
	    private Integer activeBacklogs;

	    @NotNull
	    @Min(0)
	    private Integer totalBacklogs;

	    @NotNull
	    @DecimalMin("0.0")
	    @DecimalMax("100.0")
	    private Double tenthPercentage;

	    @NotNull
	    @DecimalMin("0.0")
	    @DecimalMax("100.0")
	    private Double twelfthPercentage;

	    private String resumeUrl;

	    @NotNull
	    private UUID studentId;
}
