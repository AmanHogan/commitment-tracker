package com.amanhogan.commitment_tracker.repository.development;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.amanhogan.commitment_tracker.model.development.LearningModule;

@Repository
public interface LearningModuleRepository extends JpaRepository<LearningModule, Integer> {
}
