package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.BusinessCommitmentTwo;

import java.util.List;

public interface BusinessCommitmentTwoService {

    List<BusinessCommitmentTwo> findAll();

    BusinessCommitmentTwo create(BusinessCommitmentTwo businessCommitmentTwo);

    BusinessCommitmentTwo update(Integer id, BusinessCommitmentTwo businessCommitmentTwo);

    void delete(Integer id);

    void deleteAll();
}
