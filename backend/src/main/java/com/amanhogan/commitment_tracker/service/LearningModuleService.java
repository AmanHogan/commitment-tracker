package com.amanhogan.commitment_tracker.service;

import java.util.List;

import com.amanhogan.commitment_tracker.io.LearningModuleDto;

public interface LearningModuleService {
    LearningModuleDto createForItem(Integer itemId, LearningModuleDto dto);

    List<LearningModuleDto> findByItemId(Integer itemId);

    LearningModuleDto update(Integer moduleId, LearningModuleDto dto);

    void delete(Integer moduleId);
}
