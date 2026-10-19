package com.nie.placement.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nie.placement.entity.User;

public interface UserRepository extends JpaRepository<User,UUID> {
	Optional<User> findByEmail(String email);
}
