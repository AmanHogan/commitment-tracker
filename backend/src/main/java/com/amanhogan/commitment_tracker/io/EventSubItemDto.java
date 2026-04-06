package com.amanhogan.commitment_tracker.io;

import java.time.Instant;
import java.time.LocalDate;

public record EventSubItemDto(
        Integer id,
        Integer eventId,
        String subEventName,
        String description,
        LocalDate started,
        LocalDate finished,
        Boolean done,
        Instant createdAt,
        Instant updatedAt) {
}
