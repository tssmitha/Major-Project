package com.nie.placement.entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name= "student_academics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademic {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.UUID)
	    private UUID id;

	    @Column(nullable = false)
	    private Double cgpa;

	    @Column(nullable = false)
	    private Integer semester;

	    private Integer activeBacklogs = 0;

	    private Integer totalBacklogs = 0;

	    private Double tenthPercentage;

	    private Double twelfthPercentage;
	    
	    private String resumeUrl;
	    
	    private boolean verified;

	    @OneToOne
	    @JoinColumn(name = "student_id", nullable = false, unique = true)
	    private Student student;

}
