package com.amanhogan.commitment_tracker.mapper.development;

import java.util.List;

import com.amanhogan.commitment_tracker.io.development.LearningModuleDto;
import com.amanhogan.commitment_tracker.model.development.LearningModule;

public final class LearningModuleMapper {
    private LearningModuleMapper() {
    }

    public static LearningModuleDto toDto(LearningModule e) {
        if (e == null)
            return null;
        return new LearningModuleDto(
                e.getId(),
                e.getDevelopmentCommitmentOne() != null ? e.getDevelopmentCommitmentOne().getId() : null,
                e.getModuleName(),
                e.getType(),
                e.getHours(),
                e.getDateStarted(),
                e.getDateFinished(),
                e.getFinished(),
                e.getRequired(),
                e.getDescription(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }

    public static LearningModule toEntity(LearningModuleDto d) {
        if (d == null)
            return null;
        return LearningModule.builder()
                .id(d.id())
                .moduleName(d.moduleName())
                .type(d.type())
                .hours(d.hours())
                .dateStarted(d.dateStarted())
                .dateFinished(d.dateFinished())
                .finished(d.finished())
                .required(d.required())
                .description(d.description())
                .build();
        // learningItem is set separately in the service using the itemId
    }

    public static List<LearningModuleDto> toDtoList(List<LearningModule> list) {
        return list.stream().map(LearningModuleMapper::toDto).toList();
    }
}
