package com.amanhogan.commitment_tracker.service.business;

import java.util.List;

import com.amanhogan.commitment_tracker.io.business.BusinessCommitmentTwoDto;

public interface BusinessCommitmentTwoService {

    List<BusinessCommitmentTwoDto> findAll();

    BusinessCommitmentTwoDto create(BusinessCommitmentTwoDto dto);

    BusinessCommitmentTwoDto update(Integer id, BusinessCommitmentTwoDto dto);

    void delete(Integer id);

    void deleteAll();
}
