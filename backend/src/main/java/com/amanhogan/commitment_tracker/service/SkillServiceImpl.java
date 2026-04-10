package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.Skill;
import com.amanhogan.commitment_tracker.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;

    @Override
    public List<Skill> findAll() {
        return skillRepository.findAllByOrderByProficiencyDesc();
    }

    @Override
    public Skill create(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public Skill update(Integer id, Skill skill) {
        return skillRepository.findById(id)
                .map(existing -> {
                    existing.setName(skill.getName());
                    existing.setProficiency(skill.getProficiency());
                    existing.setDate(skill.getDate());
                    return skillRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Skill not found with id " + id));
    }

    @Override
    public void delete(Integer id) {
        if (skillRepository.existsById(id)) {
            skillRepository.deleteById(id);
        } else {
            throw new RuntimeException("Skill not found with id " + id);
        }
    }
}
