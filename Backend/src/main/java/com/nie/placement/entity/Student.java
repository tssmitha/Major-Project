package com.nie.placement.entity;

import java.util.UUID;

import jakarta.persistence.CascadeType;
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
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false, unique = true)
	private String usn;
	
	@Column(nullable = false)
	private String branch;
	
	@Column(nullable = false)
	private Integer graduationYear;
	
	private Boolean isPlaced = false;
	
	@OneToOne
	@JoinColumn(name = "user_id",nullable = false, unique = true)
	private User user;
	
	
	@OneToOne(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
	private StudentAcademic academic;
	
}
