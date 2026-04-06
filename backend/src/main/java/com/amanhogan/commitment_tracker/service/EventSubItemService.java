package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.EventSubItemDto;

import java.util.List;

public interface EventSubItemService {

    List<EventSubItemDto> findByEventId(Integer eventId);

    EventSubItemDto create(Integer eventId, EventSubItemDto dto);

    EventSubItemDto update(Integer subItemId, EventSubItemDto dto);

    void delete(Integer subItemId);
}
