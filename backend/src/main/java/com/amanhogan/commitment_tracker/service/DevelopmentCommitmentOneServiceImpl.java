package com.amanhogan.commitment_tracker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentOne;
import com.amanhogan.commitment_tracker.repository.DevelopmentCommitmentOneRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DevelopmentCommitmentOneServiceImpl implements DevelopmentCommitmentOneService {

    private final DevelopmentCommitmentOneRepository developmentCommitmentOneRepository;

    @Override
    public List<DevelopmentCommitmentOne> findAll() {
        return developmentCommitmentOneRepository.findAll();
    }

    @Override
    public DevelopmentCommitmentOne create(DevelopmentCommitmentOne developmentCommitmentOne) {
        return developmentCommitmentOneRepository.save(developmentCommitmentOne);
    }


}
