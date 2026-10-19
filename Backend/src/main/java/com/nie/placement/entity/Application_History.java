package com.nie.placement.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.nie.placement.enums.ApplicationStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "application_history")
@Getter
@Setter
@NoArgsConstructor
public class Application_History {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@ManyToOne
	@JoinColumn(name = "application_id",nullable = false)
	private Application application;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable =false)
	private ApplicationStatus statusChangedTo;
	
	@CreationTimestamp
	@Column(nullable = false)
	private LocalDateTime changedAt;
	
	@Column(length = 500)
	private String remarks;
	
}
