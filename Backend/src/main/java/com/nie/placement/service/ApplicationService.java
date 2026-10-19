package com.nie.placement.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nie.placement.dto.ApplicationRequest;
import com.nie.placement.dto.ApplicationResponse;
import com.nie.placement.dto.DriveResponse;
import com.nie.placement.entity.Application;
import com.nie.placement.entity.Drive;
import com.nie.placement.entity.Student;
import com.nie.placement.enums.ApplicationStatus;
import com.nie.placement.exception.ResourceNotFoundException;
import com.nie.placement.repository.ApplicationRepository;
import com.nie.placement.repository.DriveRepository;
import com.nie.placement.repository.StudentRepository;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@Service
public class ApplicationService {
	@Autowired
	private ApplicationRepository applicationRepo;
	
	@Autowired
	private StudentRepository studentRepo;
	
	@Autowired
	private DriveRepository driveRepo;
	
	public ApplicationResponse createApplication( ApplicationRequest application) {
		 boolean hasStudentApplied = applicationRepo.existsByStudentIdAndDriveId(application.getStudentId() , application.getDriveId());
		 
		 if (hasStudentApplied) {
		        throw new IllegalStateException("You have already applied for this drive");
		    }
		 
		 Student student = studentRepo.findById(application.getStudentId()).orElseThrow(()->new ResourceNotFoundException("student not found"));
		 
		 Drive drive = driveRepo.findById(application.getDriveId()).orElseThrow(()-> new ResourceNotFoundException("Drive not found"));
		 
		 Application newApplication = new Application();
		 
		 newApplication.setStudent(student);
		 newApplication.setDrive(drive);
		 newApplication.setCurrentStatus(ApplicationStatus.APPLIED);
		 
		 Application appli = applicationRepo.save(newApplication);
		 
		 return mapToResponse(appli);
	}
	
	private ApplicationResponse mapToResponse(Application application) {
		ApplicationResponse newApplicationResponse = new ApplicationResponse();
		
		newApplicationResponse.setId(application.getId());
		newApplicationResponse.setStudentId(application.getStudent().getId());
		newApplicationResponse.setDriveId(application.getDrive().getId());
		newApplicationResponse.setCurrentStatus(application.getCurrentStatus());
		newApplicationResponse.setAppliedAt(application.getAppliedAt());
		newApplicationResponse.setCompanyName(
			    application.getDrive().getCompany().getName()
			);

			newApplicationResponse.setRole(
			    application.getDrive().getRole()
			);
		
		return newApplicationResponse;
	}
	
	public List<ApplicationResponse>getAllApplications(){
		return applicationRepo.findAll()
				.stream()
				.map(this::mapToResponse)
				.toList();
	}
	
	public ApplicationResponse getApplicationById(UUID id) {
			Application application =  applicationRepo.findById(id)
			.orElseThrow(()->new ResourceNotFoundException("Application" +id+" not found"));
			
			return mapToResponse(application);
				
	}
	
	public List<ApplicationResponse> getApplicationsForStudent(
	        String email
	) {
	    Student student = studentRepo
	        .findByUserEmail(email)
	        .orElseThrow(
	            () -> new RuntimeException("Student profile not found")
	        );

	    return applicationRepo
	        .findByStudentId(student.getId())
	        .stream()
	        .map(this::mapToResponse)
	        .toList();
	}
}
