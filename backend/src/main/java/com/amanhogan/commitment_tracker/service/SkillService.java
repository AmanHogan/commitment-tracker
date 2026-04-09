package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.Skill;

import java.util.List;

public interface SkillService {
    List<Skill> findAll();

    Skill create(Skill skill);

    Skill update(Integer id, Skill skill);

    void delete(Integer id);
}
