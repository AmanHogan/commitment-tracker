package com.amanhogan.commitment_tracker.model.development;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "development_learning_modules")
@EntityListeners(AuditingEntityListener.class)
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LearningModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    private DevelopmentCommitmentOne developmentCommitmentOne;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String moduleName;

    @Column(columnDefinition = "TEXT")
    private String type;

    @Column(precision = 10, scale = 2)
    private BigDecimal hours;

    private LocalDate dateStarted;

    private LocalDate dateFinished;

    private Boolean finished;

    private Boolean required;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
