package com.amanhogan.commitment_tracker.repository.development;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amanhogan.commitment_tracker.model.development.OneOnOne;

public interface OneOnOneRepository extends JpaRepository<OneOnOne, Integer> {
}
