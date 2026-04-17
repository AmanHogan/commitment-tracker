package com.amanhogan.commitment_tracker.repository.business;

import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.amanhogan.commitment_tracker.model.business.BusinessCommitmentTwo;

@Repository
public interface BusinessCommitmentTwoRepository extends JpaRepository<BusinessCommitmentTwo, Integer> {

    @Override
    @EntityGraph(attributePaths = "subEvents")
    java.util.List<BusinessCommitmentTwo> findAll();

    @EntityGraph(attributePaths = "subEvents")
    Optional<BusinessCommitmentTwo> findById(Integer id);
}
