package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.BusinessCommitmentTwoDto;

import java.util.List;

public interface BusinessCommitmentTwoService {

    List<BusinessCommitmentTwoDto> findAll();

    BusinessCommitmentTwoDto create(BusinessCommitmentTwoDto dto);

    BusinessCommitmentTwoDto update(Integer id, BusinessCommitmentTwoDto dto);

    void delete(Integer id);

    void deleteAll();
}
