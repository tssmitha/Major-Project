package com.nie.placement.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademicResponse {

    private UUID id;

    private Double cgpa;
    
    private Integer semester;

    private Integer activeBacklogs;

    private Integer totalBacklogs;

    private Double tenthPercentage;

    private Double twelfthPercentage;

    private String resumeUrl;

    private Boolean verified;

    private UUID studentId;
}