package com.nie.placement.dto;

import java.util.UUID;

import com.nie.placement.enums.Roles.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
	private UUID id;
    private String email;
    private Role role;
}
