package com.nie.placement.dto;

import java.util.UUID;

import com.nie.placement.entity.StudentAcademic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponse {

    private UUID id;
    private String name;
    private String usn;
    private String branch;
    private Integer graduationYear;
    private Boolean isPlaced;
    private String email;
    
    private StudentAcademicResponse academic;
}