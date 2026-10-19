package com.nie.placement.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nie.placement.entity.Company;

public interface CompanyRepository extends JpaRepository<Company,UUID>{
	boolean existsByNameIgnoreCase(String name);
}
