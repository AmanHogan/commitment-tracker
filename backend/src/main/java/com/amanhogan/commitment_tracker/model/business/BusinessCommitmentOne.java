package com.amanhogan.commitment_tracker.model.business;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDate;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "business_commitment_one")
@EntityListeners(AuditingEntityListener.class)
public class BusinessCommitmentOne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String workItem;

    private LocalDate started;

    private LocalDate dateCompleted;

    private String[] valueCategories;

    private Boolean increasedEfficiency;

    private Boolean enhancedEmployeeExperience;

    private Boolean enhancedCustomerExperience;

    private Boolean improvedOutcomes;

    private Boolean reducedRiskCost;

    @Column(columnDefinition = "TEXT")
    private String applicationContext;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String problemOpportunity;

    @Column(columnDefinition = "TEXT")
    private String whoBenefited;

    @Column(columnDefinition = "TEXT")
    private String impact;

    @Column(columnDefinition = "TEXT")
    private String improvedOutcomesText;

    @Column(columnDefinition = "TEXT")
    private String increasedEfficiencyText;

    @Column(columnDefinition = "TEXT")
    private String reducedRiskCostText;

    @Column(columnDefinition = "TEXT")
    private String enhancedCustomerExperienceText;

    @Column(columnDefinition = "TEXT")
    private String enhancedEmployeeExperienceText;

    @Column(columnDefinition = "TEXT")
    private String alignment;

    @Column(columnDefinition = "TEXT")
    private String statusNotes;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;
}
