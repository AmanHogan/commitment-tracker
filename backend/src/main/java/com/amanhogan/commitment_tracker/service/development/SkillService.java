package com.amanhogan.commitment_tracker.service.development;

import com.amanhogan.commitment_tracker.exceptions.SkillNotFoundException;
import com.amanhogan.commitment_tracker.model.development.Skill;
import com.amanhogan.commitment_tracker.repository.development.SkillRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> findAll() {
        return skillRepository.findAllByOrderByProficiencyDesc();
    }

    public Skill create(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill update(Integer id, Skill skill) {
        return skillRepository.findById(id)
                .map(existing -> {
                    existing.setName(skill.getName());
                    existing.setProficiency(skill.getProficiency());
                    existing.setDate(skill.getDate());
                    return skillRepository.save(existing);
                })
                .orElseThrow(() -> new SkillNotFoundException("Skill not found with id " + id));
    }

    public void delete(Integer id) {
        skillRepository.deleteById(id);
    }
}
