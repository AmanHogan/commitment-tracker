package com.amanhogan.commitment_tracker.mapper.development;

import com.amanhogan.commitment_tracker.io.development.DevelopmentCommitmentTwoDto;
import com.amanhogan.commitment_tracker.model.development.DevelopmentCommitmentTwo;

import java.util.List;

public final class DevelopmentCommitmentTwoMapper {
    private DevelopmentCommitmentTwoMapper() {
    }

    public static DevelopmentCommitmentTwoDto toDto(DevelopmentCommitmentTwo e) {
        if (e == null)
            return null;
        return new DevelopmentCommitmentTwoDto(
                e.getId(),
                e.getEventName(),
                e.getType(),
                e.getDescription(),
                e.getStarted(),
                e.getFinished(),
                e.getDone(),
                e.getRequired(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }

    public static DevelopmentCommitmentTwo toEntity(DevelopmentCommitmentTwoDto d) {
        if (d == null)
            return null;
        return DevelopmentCommitmentTwo.builder()
                .id(d.id())
                .eventName(d.eventName())
                .type(d.type())
                .description(d.description())
                .started(d.started())
                .finished(d.finished())
                .done(d.done())
                .required(d.required())
                .build();
        // subEvents are managed separately via EventSubItemController
    }

    public static List<DevelopmentCommitmentTwoDto> toDtoList(List<DevelopmentCommitmentTwo> list) {
        return list.stream().map(DevelopmentCommitmentTwoMapper::toDto).toList();
    }
}
