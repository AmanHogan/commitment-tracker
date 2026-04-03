package com.amanhogan.commitment_tracker.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.amanhogan.commitment_tracker.io.BusinessCommitmentOneDto;
import com.amanhogan.commitment_tracker.model.BusinessCommitmentOne;

public final class BusinessCommitmentOneMapper {
    private BusinessCommitmentOneMapper() {
    }

    public static BusinessCommitmentOneDto toDto(BusinessCommitmentOne e) {
        if (e == null)
            return null;
        return new BusinessCommitmentOneDto(
                e.getId(),
                e.getWorkItem(),
                e.getStarted(),
                e.getDateCompleted(),
                e.getApplicationContext(),
                e.getDescription(),
                e.getProblemOpportunity(),
                e.getWhoBenefited(),
                e.getImpact(),
                e.getValueCategories(),
                e.getImprovedOutcomes(),
                e.getImprovedOutcomesText(),
                e.getIncreasedEfficiency(),
                e.getIncreasedEfficiencyText(),
                e.getReducedRiskCost(),
                e.getReducedRiskCostText(),
                e.getEnhancedCustomerExperience(),
                e.getEnhancedCustomerExperienceText(),
                e.getEnhancedEmployeeExperience(),
                e.getEnhancedEmployeeExperienceText(),
                e.getAlignment(),
                e.getStatusNotes(),
                e.getCreatedAt());
    }

    public static BusinessCommitmentOne toEntity(BusinessCommitmentOneDto d) {
        if (d == null)
            return null;
        return BusinessCommitmentOne.builder()
                .id(d.id())
                .workItem(d.workItem())
                .started(d.started())
                .dateCompleted(d.dateCompleted())
                .applicationContext(d.applicationContext())
                .description(d.description())
                .problemOpportunity(d.problemOpportunity())
                .whoBenefited(d.whoBenefited())
                .impact(d.impact())
                .valueCategories(d.valueCategories())
                .improvedOutcomes(d.improvedOutcomes())
                .improvedOutcomesText(d.improvedOutcomesText())
                .increasedEfficiency(d.increasedEfficiency())
                .increasedEfficiencyText(d.increasedEfficiencyText())
                .reducedRiskCost(d.reducedRiskCost())
                .reducedRiskCostText(d.reducedRiskCostText())
                .enhancedCustomerExperience(d.enhancedCustomerExperience())
                .enhancedCustomerExperienceText(d.enhancedCustomerExperienceText())
                .enhancedEmployeeExperience(d.enhancedEmployeeExperience())
                .enhancedEmployeeExperienceText(d.enhancedEmployeeExperienceText())
                .alignment(d.alignment())
                .statusNotes(d.statusNotes())
                .createdAt(d.createdAt())
                .build();
    }

    public static List<BusinessCommitmentOneDto> toDtoList(List<BusinessCommitmentOne> list) {
        return list.stream().map(BusinessCommitmentOneMapper::toDto).collect(Collectors.toList());
    }
}
