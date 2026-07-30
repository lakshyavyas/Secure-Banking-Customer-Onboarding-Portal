package com.bank.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.auth.entity.Role;
import com.bank.auth.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	 Optional<User> findByUsername(String username);
	List<User> findByRole(Role role);
}
