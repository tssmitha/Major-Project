package com.nie.placement.dto;

import java.util.UUID;

import com.nie.placement.enums.Industry;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyResponse {
	private UUID id;
    private String name;
    private String website;
    private String logo;
    private String description;
    private Industry industry;
}
