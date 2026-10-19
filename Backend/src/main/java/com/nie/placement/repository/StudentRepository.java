package com.nie.placement.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nie.placement.entity.Student;

public interface StudentRepository extends JpaRepository<Student,UUID> {
	Optional<Student> findByUsn(String usn);
	Optional<Student> findByUserEmail(String email);
    boolean existsByUsn(String usn);

    boolean existsByUserId(UUID userId);
}
