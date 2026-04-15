package com.amanhogan.commitment_tracker.repository.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.amanhogan.commitment_tracker.model.business.BusinessCommitmentOne;

@Repository
public interface BusinessCommitmentOneRepository extends JpaRepository<BusinessCommitmentOne, Integer> {
}
