package com.amanhogan.commitment_tracker.io;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record DevelopmentCommitmentTwoDto(
        Integer id,
        String eventName,
        String type,
        String description,
        LocalDate started,
        LocalDate finished,
        Boolean done,
        Boolean required,
        List<EventSubItemDto> subEvents,
        Instant createdAt,
        Instant updatedAt) {
}
