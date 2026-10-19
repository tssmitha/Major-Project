package com.nie.placement.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nie.placement.dto.CompanyResponse;
import com.nie.placement.entity.Company;
import com.nie.placement.repository.CompanyRepository;

@Service

public class CompanyService {
	@Autowired
	private CompanyRepository companyRepo;
	
	private CompanyResponse mapToResponse(Company company) {
        return new CompanyResponse(
            company.getId(),
            company.getName(),
            company.getWebsite(),
            company.getLogo(),
            company.getDescription(),
            company.getIndustry()
        );
    }
	
	
	 public List<CompanyResponse> getCompanies() {
	        return companyRepo.findAll()
	                .stream()
	                .map(this::mapToResponse)
	                .toList();
	    }
	
	public Company getCompanyById(UUID Id) {
		return companyRepo.findById(Id).orElse(null);
	}
	
	public Company addCompany(Company company) {

	    if (companyRepo.existsByNameIgnoreCase(company.getName())) {
	        throw new IllegalStateException("Company already exists");
	    }
		return companyRepo.save(company);
	}
}
