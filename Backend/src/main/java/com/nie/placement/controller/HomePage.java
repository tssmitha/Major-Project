package com.nie.placement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomePage {
	@RequestMapping("/home")
	public String Greet() {
		return "Welcome to NIE Placement Portal!";
	}
}
