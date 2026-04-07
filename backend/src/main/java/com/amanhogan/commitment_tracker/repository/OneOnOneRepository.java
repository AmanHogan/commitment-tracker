package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.OneOnOne;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OneOnOneRepository extends JpaRepository<OneOnOne, Integer> {
}
