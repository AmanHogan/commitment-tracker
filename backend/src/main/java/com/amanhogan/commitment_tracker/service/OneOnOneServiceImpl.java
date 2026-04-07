package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.OneOnOne;
import com.amanhogan.commitment_tracker.repository.OneOnOneRepository;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OneOnOneServiceImpl implements OneOnOneService {

    private final OneOnOneRepository oneOnOneRepository;

    @Override
    public List<OneOnOne> findAll() {
        return oneOnOneRepository.findAll();
    }

    @Override
    public OneOnOne create(OneOnOne oneOnOne) {
        return oneOnOneRepository.save(oneOnOne);
    }

    @Override
    public OneOnOne update(Integer id, OneOnOne oneOnOne) {
        return oneOnOneRepository.findById(id)
                .map(existingOneOnOne -> {
                    existingOneOnOne.setDocumentDate(oneOnOne.getDocumentDate());
                    existingOneOnOne.setBusinessPartnerWork(oneOnOne.getBusinessPartnerWork());
                    existingOneOnOne.setWorkloadConcerns(oneOnOne.getWorkloadConcerns());
                    existingOneOnOne.setTdpContributions(oneOnOne.getTdpContributions());
                    existingOneOnOne.setUtilizationPercentage(oneOnOne.getUtilizationPercentage());
                    existingOneOnOne.setTrainingSkills(oneOnOne.getTrainingSkills());
                    existingOneOnOne.setPursuingDegrees(oneOnOne.getPursuingDegrees());
                    existingOneOnOne.setCompliancePercentage(oneOnOne.getCompliancePercentage());
                    existingOneOnOne.setEhsTrainingPercentage(oneOnOne.getEhsTrainingPercentage());
                    existingOneOnOne.setGrowthHubProgress(oneOnOne.getGrowthHubProgress());
                    existingOneOnOne.setSuccessPathwaysUpdated(oneOnOne.getSuccessPathwaysUpdated());
                    existingOneOnOne.setContingencyTrainingPercentage(oneOnOne.getContingencyTrainingPercentage());
                    existingOneOnOne.setInnovationEvents(oneOnOne.getInnovationEvents());
                    existingOneOnOne.setAccomplishments(oneOnOne.getAccomplishments());
                    existingOneOnOne.setChallenges(oneOnOne.getChallenges());
                    existingOneOnOne.setGoals(oneOnOne.getGoals());
                    existingOneOnOne.setQuestions(oneOnOne.getQuestions());
                    existingOneOnOne.setReceivingSupport(oneOnOne.getReceivingSupport());
                    existingOneOnOne.setAdditionalItems(oneOnOne.getAdditionalItems());
                    existingOneOnOne.setOutOfOfficePlans(oneOnOne.getOutOfOfficePlans());
                    return oneOnOneRepository.save(existingOneOnOne);
                })
                .orElseThrow(() -> new RuntimeException("OneOnOne not found with id " + id));
    }

    @Override
    public void delete(Integer id) {
        if (oneOnOneRepository.existsById(id)) {
            oneOnOneRepository.deleteById(id);
        } else {
            throw new RuntimeException("OneOnOne not found with id " + id);
        }
    }

    @Override
    public void deleteAll() {
        oneOnOneRepository.deleteAll();
    }
}
