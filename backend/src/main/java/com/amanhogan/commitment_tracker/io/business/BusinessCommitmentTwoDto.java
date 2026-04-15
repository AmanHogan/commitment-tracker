package com.amanhogan.commitment_tracker.io.business;

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
        Instant createdAt,
        Instant updatedAt) {
}
