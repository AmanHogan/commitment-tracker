package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentTwo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DevelopmentCommitmentTwoRepository extends JpaRepository<DevelopmentCommitmentTwo, Integer> {
}
