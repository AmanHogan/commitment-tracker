package com.amanhogan.commitment_tracker.io;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record LearningModuleDto(
        Integer id,
        Integer itemId,
        String moduleName,
        String type,
        BigDecimal hours,
        LocalDate dateStarted,
        LocalDate dateFinished,
        Boolean finished,
        Boolean required,
        String description,
        Instant createdAt,
        Instant updatedAt) {
}
