package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.LearningModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningModuleRepository extends JpaRepository<LearningModule, Integer> {
}
