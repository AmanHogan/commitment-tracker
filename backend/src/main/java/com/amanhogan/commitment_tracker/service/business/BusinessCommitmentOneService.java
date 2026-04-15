package com.amanhogan.commitment_tracker.service.business;

import java.util.List;

import com.amanhogan.commitment_tracker.model.business.BusinessCommitmentOne;

public interface BusinessCommitmentOneService {

    List<BusinessCommitmentOne> findAll();

    BusinessCommitmentOne create(BusinessCommitmentOne businessCommitmentOne);

    BusinessCommitmentOne update(Integer id, BusinessCommitmentOne businessCommitmentOne);

    void delete(Integer id);

    void deleteAll();
}
