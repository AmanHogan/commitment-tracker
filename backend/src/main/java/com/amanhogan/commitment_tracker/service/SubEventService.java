package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.SubEventDto;

import java.util.List;

public interface SubEventService {
    List<SubEventDto> findByEventId(Integer eventId);

    SubEventDto create(Integer eventId, SubEventDto dto);

    SubEventDto update(Integer subEventId, SubEventDto dto);

    void delete(Integer subEventId);
}
