package com.nie.placement.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nie.placement.dto.StudentAcademicRequest;
import com.nie.placement.dto.StudentAcademicResponse;
import com.nie.placement.service.StudentAcademicService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/student-academics")
public class StudentAcademicController {
    @Autowired
    private StudentAcademicService academicService;

    @PostMapping
    public StudentAcademicResponse createAcademic(@Valid @RequestBody StudentAcademicRequest request) {
        return academicService.createAcademic(request);
    }

    @GetMapping
    public List<StudentAcademicResponse> getAllAcademics() {
        return academicService.getAllAcademics();
    }

    @GetMapping("/{id}")
    public StudentAcademicResponse getAcademicById(@PathVariable UUID id) {
        return academicService.getAcademicById(id);
    }

    @GetMapping("/student/{studentId}")
    public StudentAcademicResponse getAcademicByStudentId(@PathVariable UUID studentId) {
        return academicService.getAcademicByStudentId(studentId);
    }

    @PutMapping("/{id}")
    public StudentAcademicResponse updateAcademic(   @PathVariable UUID id,   @Valid @RequestBody StudentAcademicRequest request){
        return academicService.updateAcademic(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteAcademic(  @PathVariable UUID id) {
        academicService.deleteAcademic(id);
        return "Academic record deleted successfully";
    }

    @PutMapping("/{id}/verify")
    public StudentAcademicResponse verifyAcademic( @PathVariable UUID id) {
        return academicService.verifyAcademic(id);
    }
}