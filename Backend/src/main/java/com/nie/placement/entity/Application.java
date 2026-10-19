package com.nie.placement.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.nie.placement.enums.ApplicationStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "applications")
@Getter 
@Setter
@NoArgsConstructor                         
@AllArgsConstructor  
public class Application {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	
	@ManyToOne
	@JoinColumn(name = "student_id",nullable = false)
	private Student student;
	
	@ManyToOne
	@JoinColumn(name = "drive_id",nullable = false)
	private Drive drive;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ApplicationStatus currentStatus;
	
	@CreationTimestamp
	@Column(nullable = false,updatable = false)
	private LocalDateTime appliedAt;
	
	@OneToMany(mappedBy = "application", cascade = CascadeType.ALL , orphanRemoval = true)
	private List<Application_History>historyTimeline = new ArrayList<>();
	
	public void transitionToStatus(ApplicationStatus newStatus, String remarks) {
        this.setCurrentStatus(newStatus);
        
        Application_History historyEntry = new Application_History();
        historyEntry.setApplication(this);
        historyEntry.setStatusChangedTo(newStatus);
        historyEntry.setRemarks(remarks);
        
        this.historyTimeline.add(historyEntry);
    }
}
