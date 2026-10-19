package com.nie.placement.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nie.placement.entity.Drive;
import com.nie.placement.enums.DriveStatus;

public interface DriveRepository extends JpaRepository<Drive,UUID>{
	List<Drive> findByStatus(DriveStatus status);
}
