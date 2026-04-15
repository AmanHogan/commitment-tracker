package com.amanhogan.commitment_tracker.service.business;

import java.util.List;

import org.springframework.stereotype.Service;

import com.amanhogan.commitment_tracker.model.business.BusinessCommitmentOne;
import com.amanhogan.commitment_tracker.repository.business.BusinessCommitmentOneRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BusinessCommitmentOneImpl implements BusinessCommitmentOneService {
    private final BusinessCommitmentOneRepository businessCommitmentOneRepository;

    @Override
    public List<BusinessCommitmentOne> findAll() {
        return businessCommitmentOneRepository.findAll();
    }

    @Override
    public BusinessCommitmentOne create(BusinessCommitmentOne businessCommitmentOne) {
        return businessCommitmentOneRepository.save(businessCommitmentOne);
    }

    @Override
    public BusinessCommitmentOne update(Integer id, BusinessCommitmentOne updated) {
        return businessCommitmentOneRepository.findById(id)
                .map(existing -> {
                    existing.setWorkItem(updated.getWorkItem());
                    existing.setStarted(updated.getStarted());
                    existing.setDateCompleted(updated.getDateCompleted());
                    existing.setApplicationContext(updated.getApplicationContext());
                    existing.setDescription(updated.getDescription());
                    existing.setProblemOpportunity(updated.getProblemOpportunity());
                    existing.setWhoBenefited(updated.getWhoBenefited());
                    existing.setImpact(updated.getImpact());
                    existing.setValueCategories(updated.getValueCategories());
                    existing.setImprovedOutcomes(updated.getImprovedOutcomes());
                    existing.setImprovedOutcomesText(updated.getImprovedOutcomesText());
                    existing.setIncreasedEfficiency(updated.getIncreasedEfficiency());
                    existing.setIncreasedEfficiencyText(updated.getIncreasedEfficiencyText());
                    existing.setReducedRiskCost(updated.getReducedRiskCost());
                    existing.setReducedRiskCostText(updated.getReducedRiskCostText());
                    existing.setEnhancedCustomerExperience(updated.getEnhancedCustomerExperience());
                    existing.setEnhancedCustomerExperienceText(updated.getEnhancedCustomerExperienceText());
                    existing.setEnhancedEmployeeExperience(updated.getEnhancedEmployeeExperience());
                    existing.setEnhancedEmployeeExperienceText(updated.getEnhancedEmployeeExperienceText());
                    existing.setAlignment(updated.getAlignment());
                    existing.setStatusNotes(updated.getStatusNotes());
                    return businessCommitmentOneRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("BusinessCommitmentOne not found: " + id));
    }

    @Override
    public void delete(Integer id) {
        if (!businessCommitmentOneRepository.existsById(id)) {
            throw new RuntimeException("BusinessCommitmentOne not found: " + id);
        }
        businessCommitmentOneRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        businessCommitmentOneRepository.deleteAll();
    }
}
