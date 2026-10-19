package com.nie.placement.dto;

import com.nie.placement.enums.Roles.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
		
	 @NotBlank
	 @Email
	 @Pattern(
	  regexp = "^\\d{4}[a-zA-Z]+_[a-zA-Z]+_[a-zA-Z]@nie\\.ac\\.in$",
	  message = "Enter your college email id"
	)
	 private String email;
	 
	 @NotBlank
	 @Size(min = 8)
	 private String password;
	 
	 @NotNull(message="Role is required")
	 private Role role;

}
