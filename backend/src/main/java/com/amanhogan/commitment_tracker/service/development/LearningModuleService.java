package com.amanhogan.commitment_tracker.service.development;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.amanhogan.commitment_tracker.io.development.LearningModuleDto;
import com.amanhogan.commitment_tracker.mapper.development.LearningModuleMapper;
import com.amanhogan.commitment_tracker.model.development.DevelopmentCommitmentOne;
import com.amanhogan.commitment_tracker.model.development.LearningModule;
import com.amanhogan.commitment_tracker.repository.development.DevelopmentCommitmentOneRepository;
import com.amanhogan.commitment_tracker.repository.development.LearningModuleRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LearningModuleService   {
    private final LearningModuleRepository moduleRepo;
    private final DevelopmentCommitmentOneRepository itemRepo;

    @Transactional
    public LearningModuleDto createForItem(Integer itemId, LearningModuleDto dto) {
        DevelopmentCommitmentOne item = itemRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found"));
        LearningModule module = LearningModuleMapper.toEntity(dto);
        module.setLearningItem(item);
        LearningModule saved = moduleRepo.save(module);
        return LearningModuleMapper.toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<LearningModuleDto> findByItemId(Integer itemId) {
        DevelopmentCommitmentOne item = itemRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Item not found"));
        return item.getModules().stream().map(LearningModuleMapper::toDto).toList();
    }

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

    @Transactional
    public void delete(Integer moduleId) {
        moduleRepo.deleteById(moduleId);
    }

}