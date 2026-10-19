package com.nie.placement.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nie.placement.dto.StudentAcademicRequest;
import com.nie.placement.dto.StudentAcademicResponse;
import com.nie.placement.entity.Student;
import com.nie.placement.entity.StudentAcademic;
import com.nie.placement.exception.ResourceNotFoundException;
import com.nie.placement.repository.StudentAcademicRepository;
import com.nie.placement.repository.StudentRepository;

@Service
public class StudentAcademicService {

    @Autowired
    private StudentAcademicRepository academicRepo;

    @Autowired
    private StudentRepository studentRepo;

    public StudentAcademicResponse createAcademic(StudentAcademicRequest request) {

        if (academicRepo.existsByStudentId(request.getStudentId())) {
            throw new IllegalStateException("Academic record already exists for this student");
        }

        Student student = studentRepo.findById(request.getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        StudentAcademic academic = new StudentAcademic();

        academic.setCgpa(request.getCgpa());
        academic.setSemester(request.getSemester());
        academic.setActiveBacklogs(request.getActiveBacklogs());
        academic.setTotalBacklogs(request.getTotalBacklogs());
        academic.setTenthPercentage(request.getTenthPercentage());
        academic.setTwelfthPercentage(request.getTwelfthPercentage());
        academic.setResumeUrl(request.getResumeUrl());
        academic.setVerified(false);
        academic.setStudent(student);

        StudentAcademic savedAcademic = academicRepo.save(academic);

        return mapToResponse(savedAcademic);
    }

    public List<StudentAcademicResponse> getAllAcademics() {
        return academicRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public StudentAcademicResponse getAcademicById(UUID id) {
        StudentAcademic academic = academicRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Academic record not found"));

        return mapToResponse(academic);
    }

    public StudentAcademicResponse getAcademicByStudentId(UUID studentId) {
        StudentAcademic academic = academicRepo.findByStudentId(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Academic record not found for student"));

        return mapToResponse(academic);
    }

    public StudentAcademicResponse updateAcademic(UUID id, StudentAcademicRequest request) {
        StudentAcademic academic = academicRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Academic record not found"));

        academic.setCgpa(request.getCgpa());
        academic.setActiveBacklogs(request.getActiveBacklogs());
        academic.setTotalBacklogs(request.getTotalBacklogs());
        academic.setTenthPercentage(request.getTenthPercentage());
        academic.setTwelfthPercentage(request.getTwelfthPercentage());
        academic.setResumeUrl(request.getResumeUrl());

        // Any student update should usually require re-verification
        academic.setVerified(false);

        StudentAcademic updatedAcademic = academicRepo.save(academic);

        return mapToResponse(updatedAcademic);
    }

    public void deleteAcademic(UUID id) {
        StudentAcademic academic = academicRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Academic record not found"));

        academicRepo.delete(academic);
    }

    public StudentAcademicResponse verifyAcademic(UUID id) {
        StudentAcademic academic = academicRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Academic record not found"));

        academic.setVerified(true);

        StudentAcademic verifiedAcademic = academicRepo.save(academic);

        return mapToResponse(verifiedAcademic);
    }

    private StudentAcademicResponse mapToResponse(StudentAcademic academic) {
        StudentAcademicResponse response = new StudentAcademicResponse();

        response.setId(academic.getId());
        response.setCgpa(academic.getCgpa());
        response.setSemester(academic.getSemester());
        response.setActiveBacklogs(academic.getActiveBacklogs());
        response.setTotalBacklogs(academic.getTotalBacklogs());
        response.setTenthPercentage(academic.getTenthPercentage());
        response.setTwelfthPercentage(academic.getTwelfthPercentage());
        response.setResumeUrl(academic.getResumeUrl());
        response.setVerified(academic.isVerified());
        response.setStudentId(academic.getStudent().getId());

        return response;
    }
}