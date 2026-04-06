package com.amanhogan.commitment_tracker.mapper;

import com.amanhogan.commitment_tracker.io.EventSubItemDto;
import com.amanhogan.commitment_tracker.model.EventSubItem;

import java.util.List;
import java.util.stream.Collectors;

public final class EventSubItemMapper {
    private EventSubItemMapper() {
    }

    public static EventSubItemDto toDto(EventSubItem e) {
        if (e == null)
            return null;
        return new EventSubItemDto(
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

    public static EventSubItem toEntity(EventSubItemDto d) {
        if (d == null)
            return null;
        return EventSubItem.builder()
                .id(d.id())
                .subEventName(d.subEventName())
                .description(d.description())
                .started(d.started())
                .finished(d.finished())
                .done(d.done())
                .build();
        // event is set separately in the service
    }

    public static List<EventSubItemDto> toDtoList(List<EventSubItem> list) {
        return list.stream().map(EventSubItemMapper::toDto).collect(Collectors.toList());
    }
}
