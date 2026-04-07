package com.amanhogan.commitment_tracker.service;

import java.util.List;

import com.amanhogan.commitment_tracker.model.OneOnOne;

public interface OneOnOneService {
    List<OneOnOne> findAll();

    OneOnOne create(OneOnOne oneOnOne);

    OneOnOne update(Integer id, OneOnOne oneOnOne);

    void delete(Integer id);

    void deleteAll();
}
