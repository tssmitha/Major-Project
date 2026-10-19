package com.nie.placement.security;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
    	
    	System.out.println("JWT FILTER HIT: " + request.getMethod() + " " + request.getRequestURI());

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        if (jwtService.isTokenValid(token) &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            String email = jwtService.extractEmail(token);
            String role = jwtService.extractRole(token);

            if (role != null) {
                // Ensure authority always has the "ROLE_" prefix without duplicating it
            	String formattedRole =
            	        role.startsWith("ROLE_") ? role : "ROLE_" + role;

            	    System.out.println("JWT ROLE = " + role);
            	    System.out.println("SPRING AUTHORITY = " + formattedRole);

                
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(formattedRole);

                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(authority)
                    );

                authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}