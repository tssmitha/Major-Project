package com.nie.placement.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.nie.placement.enums.Industry;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "company")
@EntityListeners(AuditingEntityListener.class)

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    /*
     * Student-facing company information
     */

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String website;

    private String logo;

    @Column(length = 2000)
    private String description;

    @Enumerated(EnumType.STRING)
    private Industry industry;

    private String headquarters;

    private String careersUrl;

    private String linkedinUrl;

    private String companySize;

    @Column(length = 2000)
    private String workCulture;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "company_tech_stack",
        joinColumns = @JoinColumn(name = "company_id")
    )
    @Column(name = "technology", nullable = false)
    private List<String> techStack = new ArrayList<>();

    /*
     * Placement-office contact information.
     * Do not include these fields in student-facing DTOs.
     */

    @Column(name = "contact_email", nullable = false, unique = true)
    private String contactEmail;

    @Column
    private String hrName;

    @Column
    private String hrContact;

    /*
     * Audit information
     */

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}