package com.amanhogan.commitment_tracker.io.development;

import java.time.Instant;
import java.time.LocalDate;

public record DevelopmentCommitmentTwoDto(
                Integer id,
                String eventName,
                String type,
                String description,
                LocalDate started,
                LocalDate finished,
                Boolean done,
                Boolean required,
                Instant createdAt,
                Instant updatedAt) {
}
