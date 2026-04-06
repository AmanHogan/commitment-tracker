package com.amanhogan.commitment_tracker.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LearningModuleDto {

    private Integer id;

    // parent DevelopmentCommitmentOne id
    private Integer itemId;

    private String moduleName;

    private String type;

    private BigDecimal hours;

    private LocalDate dateStarted;

    private LocalDate dateFinished;

    private Boolean finished;

    private Boolean required;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;
}
