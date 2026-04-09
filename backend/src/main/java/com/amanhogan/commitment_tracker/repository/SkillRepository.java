package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    List<Skill> findAllByOrderByProficiencyDesc();
}
