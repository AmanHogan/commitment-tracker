package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.BusinessCommitmentTwo;
import com.amanhogan.commitment_tracker.repository.BusinessCommitmentTwoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessCommitmentTwoImpl implements BusinessCommitmentTwoService {
    private final BusinessCommitmentTwoRepository businessCommitmentTwoRepository;

    @Override
    public List<BusinessCommitmentTwo> findAll() {
        return businessCommitmentTwoRepository.findAll();
    }

    @Override
    public BusinessCommitmentTwo create(BusinessCommitmentTwo businessCommitmentTwo) {
        return businessCommitmentTwoRepository.save(businessCommitmentTwo);
    }

    @Override
    public BusinessCommitmentTwo update(Integer id, BusinessCommitmentTwo updated) {
        return businessCommitmentTwoRepository.findById(id)
                .map(existing -> {
                    existing.setEventName(updated.getEventName());
                    existing.setType(updated.getType());
                    existing.setDone(updated.getDone());
                    existing.setStarted(updated.getStarted());
                    existing.setFinished(updated.getFinished());
                    existing.setRequired(updated.getRequired());
                    existing.setDescription(updated.getDescription());
                    return businessCommitmentTwoRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("InnovationEvent not found: " + id));
    }

    @Override
    public void delete(Integer id) {
        if (!businessCommitmentTwoRepository.existsById(id)) {
            throw new RuntimeException("InnovationEvent not found: " + id);
        }
        businessCommitmentTwoRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        businessCommitmentTwoRepository.deleteAll();
    }
}
