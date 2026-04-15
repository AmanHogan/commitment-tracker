package com.amanhogan.commitment_tracker.io.business;

import java.time.Instant;
import java.time.LocalDate;

public record SubEventDto(
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
