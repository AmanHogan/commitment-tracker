package com.amanhogan.commitment_tracker.model;

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
@Table(name = "business_commitments")
@EntityListeners(AuditingEntityListener.class)
public class BusinessCommitmentOne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String workItem;

    private LocalDate started;

    private LocalDate dateCompleted;

    private String applicationContext;

    private String description;

    private String problemOpportunity;

    private String whoBenefited;

    private String impact;

    private String[] valueCategories;

    private Boolean improvedOutcomes;
    private String improvedOutcomesText;

    private Boolean increasedEfficiency;
    private String increasedEfficiencyText;

    private Boolean reducedRiskCost;
    private String reducedRiskCostText;

    private Boolean enhancedCustomerExperience;
    private String enhancedCustomerExperienceText;

    private Boolean enhancedEmployeeExperience;
    private String enhancedEmployeeExperienceText;

    private String alignment;

    private String statusNotes;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;
}
