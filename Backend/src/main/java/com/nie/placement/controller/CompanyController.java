package com.nie.placement.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nie.placement.dto.CompanyResponse;
import com.nie.placement.entity.Company;
import com.nie.placement.service.CompanyService;

@RestController
public class CompanyController {
	
	@Autowired
	private CompanyService companyService;
	
	@GetMapping("/companies")
	public List<CompanyResponse>getAllCompanies(){
		return companyService.getCompanies();
	}
	
	@GetMapping("/companies/{Id}")
	public Company getCompany(@PathVariable UUID Id) {
		return companyService.getCompanyById(Id);
	}
	
	@PostMapping("/companies")
	public Company addCompany(@RequestBody Company company) {
		return companyService.addCompany(company);
	}
}
