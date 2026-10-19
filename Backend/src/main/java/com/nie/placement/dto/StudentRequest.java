package com.nie.placement.dto;

import java.util.UUID;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequest {

    @NotBlank
    private String name;

    @NotBlank
    private String usn;

    @NotBlank
    private String branch;

    @NotNull
    private Integer graduationYear;

    @NotNull
    private UUID userId;
}
