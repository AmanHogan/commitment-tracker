package com.amanhogan.commitment_tracker.service;

import java.util.List;

import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentOne;

public interface DevelopmentCommitmentOneService {

    List<DevelopmentCommitmentOne> findAll();

    DevelopmentCommitmentOne create(DevelopmentCommitmentOne developmentCommitmentOne);

    void delete(Integer id);

}
