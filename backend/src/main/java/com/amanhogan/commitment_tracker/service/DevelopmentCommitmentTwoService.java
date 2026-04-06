package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.DevelopmentCommitmentTwoDto;

import java.util.List;

public interface DevelopmentCommitmentTwoService {

    List<DevelopmentCommitmentTwoDto> findAll();

    DevelopmentCommitmentTwoDto create(DevelopmentCommitmentTwoDto dto);

    DevelopmentCommitmentTwoDto update(Integer id, DevelopmentCommitmentTwoDto dto);

    void delete(Integer id);
}
