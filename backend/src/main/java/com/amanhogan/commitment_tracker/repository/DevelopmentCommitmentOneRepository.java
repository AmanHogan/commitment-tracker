package com.amanhogan.commitment_tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentOne;

@Repository
public interface DevelopmentCommitmentOneRepository extends JpaRepository<DevelopmentCommitmentOne, Integer> {

}
