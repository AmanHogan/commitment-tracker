package com.amanhogan.commitment_tracker.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amanhogan.commitment_tracker.io.LearningModuleDto;
import com.amanhogan.commitment_tracker.mapper.LearningModuleMapper;
import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentOne;
import com.amanhogan.commitment_tracker.model.LearningModule;
import com.amanhogan.commitment_tracker.repository.DevelopmentCommitmentOneRepository;
import com.amanhogan.commitment_tracker.repository.LearningModuleRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LearningModuleServiceImpl implements LearningModuleService {
    private final LearningModuleRepository moduleRepo;
    private final DevelopmentCommitmentOneRepository itemRepo;

    @Override
    @Transactional
    public LearningModuleDto createForItem(Integer itemId, LearningModuleDto dto) {
        DevelopmentCommitmentOne item = itemRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found"));
        LearningModule module = LearningModuleMapper.toEntity(dto);
        module.setLearningItem(item);
        LearningModule saved = moduleRepo.save(module);
        return LearningModuleMapper.toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LearningModuleDto> findByItemId(Integer itemId) {
        DevelopmentCommitmentOne item = itemRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found"));
        return item.getModules().stream().map(LearningModuleMapper::toDto).toList();
    }

    @Override
    @Transactional
    public LearningModuleDto update(Integer moduleId, LearningModuleDto dto) {
        LearningModule module = moduleRepo.findById(moduleId)
                .orElseThrow(() -> new EntityNotFoundException("Module not found"));
        // copy fields from dto -> module
        module.setModuleName(dto.moduleName());
        module.setType(dto.type());
        module.setHours(dto.hours());
        module.setDateStarted(dto.dateStarted());
        module.setDateFinished(dto.dateFinished());
        module.setFinished(dto.finished());
        module.setRequired(dto.required());
        module.setDescription(dto.description());
        return LearningModuleMapper.toDto(moduleRepo.save(module));
    }

    @Override
    @Transactional
    public void delete(Integer moduleId) {
        moduleRepo.deleteById(moduleId);
    }

}