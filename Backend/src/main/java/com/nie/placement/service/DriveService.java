package com.nie.placement.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nie.placement.dto.CompanyResponse;
import com.nie.placement.dto.DriveRequest;
import com.nie.placement.dto.DriveResponse;
import com.nie.placement.entity.Company;
import com.nie.placement.entity.Drive;
import com.nie.placement.enums.DriveStatus;
import com.nie.placement.exception.ResourceNotFoundException;
import com.nie.placement.repository.CompanyRepository;
import com.nie.placement.repository.DriveRepository;

@Service
public class DriveService {
	@Autowired
	private DriveRepository driveRepo;
	
	@Autowired
	private CompanyRepository companyRepo;
	
	public List<DriveResponse>getDrives(){
		return driveRepo.findAll()
				.stream()
				.map(this::mapToDriveResponse)
				.toList();
	}
	
	public DriveResponse createDrive(DriveRequest request) {
		Drive drive = new Drive();
		
		drive.setRole(request.getRole());
		drive.setCtc(request.getCtc());
		drive.setEligibleBranches(request.getEligibleBranches());
		drive.setMinCgpa(request.getMinCgpa());
		drive.setLocation(request.getLocation());
		drive.setReleaseDate(request.getReleaseDate());
		drive.setLastDateToApply(request.getLastDateToApply());
		drive.setBatch(request.getBatch());
		drive.setActiveBacklogs(request.getActiveBacklogs());
		drive.setEmploymentType(request.getEmploymentType());
		drive.setDriveMode(request.getDriveMode());
		drive.setVenueOrLink(request.getVenueOrLink());
		drive.setJobSummary(request.getJobSummary());
		drive.setSkills(request.getSkills());
		drive.setAdditionalInstructions(request.getAdditionalInstructions());
		drive.setJobDescriptionUrl(request.getJobDescriptionUrl());
		
		
		Company company = companyRepo.findById(request.getCompanyId())
				.orElseThrow(()-> new ResourceNotFoundException("Company not found"));
		
		drive.setCompany(company);
		drive.setStatus(DriveStatus.DRAFT);
		
		Drive savedDrive = driveRepo.save(drive);
	    
	    return mapToDriveResponse(savedDrive);
}
	
	private DriveResponse mapToDriveResponse(Drive drive) {
        DriveResponse response = new DriveResponse();

        response.setId(drive.getId());
        response.setRole(drive.getRole());
        response.setCtc(drive.getCtc());
        response.setMinCgpa(drive.getMinCgpa());
        response.setLocation(drive.getLocation());
        response.setEligibleBranches(drive.getEligibleBranches());
        response.setReleaseDate(drive.getReleaseDate());
        response.setLastDateToApply(drive.getLastDateToApply());
        response.setStatus(drive.getStatus());
        response.setBatch(drive.getBatch());
        response.setActiveBacklogs(drive.getActiveBacklogs());
        response.setEmploymentType(drive.getEmploymentType());
        response.setDriveMode(drive.getDriveMode());
        response.setVenueOrLink(drive.getVenueOrLink());
        response.setJobSummary(drive.getJobSummary());
        response.setSkills(drive.getSkills());
        response.setAdditionalInstructions(drive.getAdditionalInstructions());
        response.setJobDescriptionUrl(drive.getJobDescriptionUrl());
        

        Company company = drive.getCompany();

        CompanyResponse companyResponse =
                new CompanyResponse(
                        company.getId(),
                        company.getName(),
                        company.getWebsite(),
                        company.getLogo(),
                        company.getDescription(),
                        company.getIndustry()
                );

        response.setCompany(companyResponse);

        return response;
    }
	
	public DriveResponse getDriveById(UUID id) {
		Drive drive = driveRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Drive" +id+" not found"));
		return mapToDriveResponse(drive);
	}
	
	public List<DriveResponse> getPublishedDrives() {
	    return driveRepo.findByStatus(DriveStatus.PUBLISHED)
	            .stream()
	            .map(this::mapToDriveResponse)
	            .toList();
	}
	
	public DriveResponse publishDrive(UUID id) {
	    Drive drive = driveRepo.findById(id)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Drive " + id + " not found"));

	    if (drive.getStatus() != DriveStatus.DRAFT) {
	        throw new IllegalStateException(
	                "Only a draft drive can be published"
	        );
	    }

	    drive.setStatus(DriveStatus.PUBLISHED);

	    Drive savedDrive = driveRepo.save(drive);
	    return mapToDriveResponse(savedDrive);
	}
}
