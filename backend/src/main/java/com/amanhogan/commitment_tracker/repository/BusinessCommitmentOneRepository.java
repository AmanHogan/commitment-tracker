package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.BusinessCommitmentOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessCommitmentOneRepository extends JpaRepository<BusinessCommitmentOne, Integer> {
}
