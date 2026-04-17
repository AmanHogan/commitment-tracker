package com.amanhogan.commitment_tracker.io.business;

import java.util.List;
import java.time.Instant;
import java.time.LocalDate;

public record BusinessCommitmentTwoDto(
        Integer id,
        String eventName,
        String type,
        Boolean done,
        LocalDate started,
        LocalDate finished,
        Boolean required,
        String description,
        List<SubEventDto> subEvents,
        Instant createdAt,
        Instant updatedAt) {
}
