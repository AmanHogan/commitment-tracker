package com.amanhogan.commitment_tracker.io.business;

import java.time.Instant;
import java.time.LocalDate;

public record BusinessCommitmentOneDto(
        Integer id,
        String workItem,
        LocalDate started,
        LocalDate dateCompleted,
        String applicationContext,
        String description,
        String problemOpportunity,
        String whoBenefited,
        String impact,
        String[] valueCategories,
        Boolean improvedOutcomes,
        String improvedOutcomesText,
        Boolean increasedEfficiency,
        String increasedEfficiencyText,
        Boolean reducedRiskCost,
        String reducedRiskCostText,
        Boolean enhancedCustomerExperience,
        String enhancedCustomerExperienceText,
        Boolean enhancedEmployeeExperience,
        String enhancedEmployeeExperienceText,
        String alignment,
        String statusNotes,
        Instant createdAt) {
}
