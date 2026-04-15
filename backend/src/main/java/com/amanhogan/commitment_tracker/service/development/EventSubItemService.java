package com.amanhogan.commitment_tracker.service.development;

import com.amanhogan.commitment_tracker.io.development.EventSubItemDto;
import com.amanhogan.commitment_tracker.mapper.development.EventSubItemMapper;
import com.amanhogan.commitment_tracker.model.development.DevelopmentCommitmentTwo;
import com.amanhogan.commitment_tracker.model.development.EventSubItem;
import com.amanhogan.commitment_tracker.repository.development.DevelopmentCommitmentTwoRepository;
import com.amanhogan.commitment_tracker.repository.development.EventSubItemRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventSubItemService {

    private final EventSubItemRepository subItemRepo;
    private final DevelopmentCommitmentTwoRepository eventRepo;

    @Transactional(readOnly = true)
    public List<EventSubItemDto> findByEventId(Integer eventId) {
        return EventSubItemMapper.toDtoList(subItemRepo.findByEventId(eventId));
    }

    @Transactional
    public EventSubItemDto create(Integer eventId, EventSubItemDto dto) {
        DevelopmentCommitmentTwo event = eventRepo.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        EventSubItem subItem = EventSubItemMapper.toEntity(dto);
        subItem.setEvent(event);
        return EventSubItemMapper.toDto(subItemRepo.save(subItem));
    }

    @Transactional
    public EventSubItemDto update(Integer subItemId, EventSubItemDto dto) {
        EventSubItem subItem = subItemRepo.findById(subItemId)
                .orElseThrow(() -> new EntityNotFoundException("Sub-event not found"));
        subItem.setSubEventName(dto.subEventName());
        subItem.setDescription(dto.description());
        subItem.setStarted(dto.started());
        subItem.setFinished(dto.finished());
        subItem.setDone(dto.done());
        return EventSubItemMapper.toDto(subItemRepo.save(subItem));
    }

    @Transactional
    public void delete(Integer subItemId) {
        subItemRepo.deleteById(subItemId);
    }
}
