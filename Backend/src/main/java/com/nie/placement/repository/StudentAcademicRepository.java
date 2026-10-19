package com.nie.placement.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nie.placement.entity.StudentAcademic;

public interface StudentAcademicRepository extends JpaRepository<StudentAcademic,UUID>{
	Optional<StudentAcademic> findByStudentId(UUID studentId);

    boolean existsByStudentId(UUID studentId);
}
