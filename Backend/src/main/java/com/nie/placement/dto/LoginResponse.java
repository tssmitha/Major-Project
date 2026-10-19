package com.nie.placement.dto;

import java.util.UUID;

import com.nie.placement.enums.Roles.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private UUID userId;
    private String email;
    private Role role;
    private String token;
}
