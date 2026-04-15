package com.amanhogan.commitment_tracker.repository.development;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amanhogan.commitment_tracker.model.development.Skill;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
    List<Skill> findAllByOrderByProficiencyDesc();

    boolean existsById(Integer id);
}
