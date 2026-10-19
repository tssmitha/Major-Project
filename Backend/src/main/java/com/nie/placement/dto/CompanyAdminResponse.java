package com.nie.placement.dto;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyAdminResponse {
		private UUID id;
		private String name;
		private String website;
		private String logo;
		private String description;
		private String industry;
}
