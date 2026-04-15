package com.amanhogan.commitment_tracker.service.business;

import java.util.List;

import com.amanhogan.commitment_tracker.io.business.SubEventDto;

public interface SubEventService {
    List<SubEventDto> findByEventId(Integer eventId);

    SubEventDto create(Integer eventId, SubEventDto dto);

    SubEventDto update(Integer subEventId, SubEventDto dto);

    void delete(Integer subEventId);
}
