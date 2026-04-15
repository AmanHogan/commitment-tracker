package com.amanhogan.commitment_tracker.service.development;

import java.util.List;

import org.springframework.stereotype.Service;

import com.amanhogan.commitment_tracker.model.development.DevelopmentCommitmentOne;
import com.amanhogan.commitment_tracker.repository.development.DevelopmentCommitmentOneRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DevelopmentCommitmentOneService {

    private final DevelopmentCommitmentOneRepository developmentCommitmentOneRepository;

    public List<DevelopmentCommitmentOne> findAll() {
        return developmentCommitmentOneRepository.findAll();
    }

    public DevelopmentCommitmentOne create(DevelopmentCommitmentOne developmentCommitmentOne) {
        return developmentCommitmentOneRepository.save(developmentCommitmentOne);
    }

    public DevelopmentCommitmentOne update(Integer id, DevelopmentCommitmentOne developmentCommitmentOne) {
        DevelopmentCommitmentOne existing = developmentCommitmentOneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("DevelopmentCommitmentOne not found: " + id));
        existing.setItemName(developmentCommitmentOne.getItemName());
        existing.setItemDate(developmentCommitmentOne.getItemDate());
        return developmentCommitmentOneRepository.save(existing);
    }

    public void delete(Integer id) {
        if (!developmentCommitmentOneRepository.existsById(id)) {
            throw new RuntimeException("DevelopmentCommitmentOne not found: " + id);
        }
        developmentCommitmentOneRepository.deleteById(id);
    }

}
