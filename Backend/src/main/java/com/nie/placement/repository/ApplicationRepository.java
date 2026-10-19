package com.nie.placement.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nie.placement.entity.Application;


public interface ApplicationRepository extends JpaRepository<Application, UUID> {
	List<Application>findByStudentId(UUID studentId);
	List<Application>findByDriveId(UUID driveId);
	
	Optional<Application> findByStudentIdAndDriveId(UUID studentId, UUID driveId);
	
	boolean existsByStudentIdAndDriveId(UUID studentId , UUID driveId);
}
