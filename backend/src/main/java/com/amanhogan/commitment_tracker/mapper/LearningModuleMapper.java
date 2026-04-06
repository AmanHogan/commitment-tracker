package com.amanhogan.commitment_tracker.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.amanhogan.commitment_tracker.io.LearningModuleDto;
import com.amanhogan.commitment_tracker.model.LearningModule;

public final class LearningModuleMapper {
    private LearningModuleMapper() {
    }

    public static LearningModuleDto toDto(LearningModule e) {
        if (e == null)
            return null;
        return LearningModuleDto.builder()
                .id(e.getId())
                .itemId(e.getLearningItem() != null ? e.getLearningItem().getId() : null)
                .moduleName(e.getModuleName())
                .type(e.getType())
                .hours(e.getHours())
                .dateStarted(e.getDateStarted())
                .dateFinished(e.getDateFinished())
                .finished(e.getFinished())
                .required(e.getRequired())
                .description(e.getDescription())
                .createdAt(e.getCreatedAt())
                .updatedAt(e.getUpdatedAt())
                .build();
    }

    public static LearningModule toEntity(LearningModuleDto d) {
        if (d == null)
            return null;
        return LearningModule.builder()
                .id(d.getId())
                .moduleName(d.getModuleName())
                .type(d.getType())
                .hours(d.getHours())
                .dateStarted(d.getDateStarted())
                .dateFinished(d.getDateFinished())
                .finished(d.getFinished())
                .required(d.getRequired())
                .description(d.getDescription())
                .build();
        // learningItem is set separately in the service using the itemId
    }

    public static List<LearningModuleDto> toDtoList(List<LearningModule> list) {
        return list.stream().map(LearningModuleMapper::toDto).collect(Collectors.toList());
    }
}
