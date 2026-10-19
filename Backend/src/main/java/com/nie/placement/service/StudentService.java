package com.nie.placement.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.nie.placement.dto.ApplicationResponse;
import com.nie.placement.dto.StudentAcademicResponse;
import com.nie.placement.dto.StudentRequest;
import com.nie.placement.dto.StudentResponse;
import com.nie.placement.entity.Student;
import com.nie.placement.entity.StudentAcademic;
import com.nie.placement.entity.User;
import com.nie.placement.exception.ResourceNotFoundException;
import com.nie.placement.repository.StudentRepository;
import com.nie.placement.repository.UserRepository;

@Service
public class StudentService {
	@Autowired
	private StudentRepository studentRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private ApplicationService applicationService;
	
	
	public List<Student> getStudents(){
		return studentRepo.findAll();
	}
	
	public StudentResponse createStudent(StudentRequest request) {
		
		User user = userRepo.findById(request.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User not found"));
		
		if (studentRepo.existsByUsn(request.getUsn())) {
		    throw new RuntimeException("USN already exists");
		}

		if (studentRepo.existsByUserId(request.getUserId())) {
		    throw new RuntimeException("Student profile already exists for this user");
		}
		
		    Student student = new Student();
		    
		  student.setName(request.getName());
		  student.setUsn(request.getUsn());
		  student.setBranch(request.getBranch());
		  student.setGraduationYear(request.getGraduationYear());
		  student.setUser(user);
		  
		  
		  Student savedStudent = studentRepo.save(student);
		    
		    StudentResponse response = new StudentResponse();
		    response.setId(savedStudent.getId());
		    response.setName(savedStudent.getName());
		    response.setUsn(savedStudent.getUsn());
		    response.setBranch(savedStudent.getBranch());
		    response.setGraduationYear(savedStudent.getGraduationYear());		    
		    return response;
		
		
	}

	public Student getStudentByid(UUID id) {
		return studentRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Student with " +id+" not found"));
	}
	
	public StudentResponse updateStudent(StudentRequest request,UUID id) {
		Student student = studentRepo.findById(id)
			    .orElseThrow(() ->
			        new ResourceNotFoundException("Student not found"));
	
	 	student.setName(request.getName());
	    student.setUsn(request.getUsn());
	    student.setBranch(request.getBranch());
	    student.setGraduationYear(request.getGraduationYear());

	    Student savedStudent = studentRepo.save(student);

	    StudentResponse response = new StudentResponse();
	    response.setId(savedStudent.getId());
	    response.setName(savedStudent.getName());
	    response.setUsn(savedStudent.getUsn());
	    response.setBranch(savedStudent.getBranch());
	    response.setGraduationYear(savedStudent.getGraduationYear());

	    return response;
	}
	
	public StudentResponse getProfile(String email) {

	    Student student = studentRepo.findByUserEmail(email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Student profile not found for logged-in user"
	                    )
	            );

	    StudentResponse response = new StudentResponse();
	    response.setId(student.getId());
	    response.setName(student.getName());
	    response.setUsn(student.getUsn());
	    response.setBranch(student.getBranch());
	    response.setEmail(student.getUser().getEmail());
	    response.setGraduationYear(student.getGraduationYear());
	    
	    StudentAcademic academic = student.getAcademic();

	    if (academic != null) {

	        StudentAcademicResponse academicResponse =
	                new StudentAcademicResponse();

	        academicResponse.setId(academic.getId());
	        academicResponse.setCgpa(academic.getCgpa());
	        academicResponse.setSemester(academic.getSemester());
	        academicResponse.setActiveBacklogs(academic.getActiveBacklogs());
	        academicResponse.setTotalBacklogs(academic.getTotalBacklogs());
	        academicResponse.setTenthPercentage(academic.getTenthPercentage());
	        academicResponse.setTwelfthPercentage(academic.getTwelfthPercentage());
	        academicResponse.setResumeUrl(academic.getResumeUrl());
	        academicResponse.setVerified(academic.isVerified());
	        academicResponse.setStudentId(student.getId());

	        response.setAcademic(academicResponse);
	    }

	    return response;
	}

@GetMapping("/profile/applications")
public ResponseEntity<List<ApplicationResponse>>
        getMyApplications(Authentication authentication) {

    String email = authentication.getName();

    List<ApplicationResponse> applications =
        applicationService.getApplicationsForStudent(email);

    return ResponseEntity.ok(applications);
}
}


