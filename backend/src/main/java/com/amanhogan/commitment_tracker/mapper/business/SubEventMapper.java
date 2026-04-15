package com.amanhogan.commitment_tracker.mapper.business;

import com.amanhogan.commitment_tracker.io.business.SubEventDto;
import com.amanhogan.commitment_tracker.model.business.SubEvent;

import java.util.List;

public final class SubEventMapper {
    private SubEventMapper() {
    }

    public static SubEventDto toDto(SubEvent e) {
        if (e == null)
            return null;
        return new SubEventDto(
                e.getId(),
                e.getEvent() != null ? e.getEvent().getId() : null,
                e.getSubEventName(),
                e.getDescription(),
                e.getStarted(),
                e.getFinished(),
                e.getDone(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }

    public static SubEvent toEntity(SubEventDto d) {
        if (d == null)
            return null;
        return SubEvent.builder()
                .id(d.id())
                .subEventName(d.subEventName())
                .description(d.description())
                .started(d.started())
                .finished(d.finished())
                .done(d.done())
                .build();
    }

    public static List<SubEventDto> toDtoList(List<SubEvent> list) {
        return list.stream().map(SubEventMapper::toDto).toList();
    }
}
