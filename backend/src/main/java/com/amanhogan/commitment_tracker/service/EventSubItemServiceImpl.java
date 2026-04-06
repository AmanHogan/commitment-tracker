package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.EventSubItemDto;
import com.amanhogan.commitment_tracker.mapper.EventSubItemMapper;
import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentTwo;
import com.amanhogan.commitment_tracker.model.EventSubItem;
import com.amanhogan.commitment_tracker.repository.DevelopmentCommitmentTwoRepository;
import com.amanhogan.commitment_tracker.repository.EventSubItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventSubItemServiceImpl implements EventSubItemService {

    private final EventSubItemRepository subItemRepo;
    private final DevelopmentCommitmentTwoRepository eventRepo;

    @Override
    @Transactional(readOnly = true)
    public List<EventSubItemDto> findByEventId(Integer eventId) {
        return EventSubItemMapper.toDtoList(subItemRepo.findByEventId(eventId));
    }

    @Override
    @Transactional
    public EventSubItemDto create(Integer eventId, EventSubItemDto dto) {
        DevelopmentCommitmentTwo event = eventRepo.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        EventSubItem subItem = EventSubItemMapper.toEntity(dto);
        subItem.setEvent(event);
        return EventSubItemMapper.toDto(subItemRepo.save(subItem));
    }

    @Override
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

    @Override
    @Transactional
    public void delete(Integer subItemId) {
        subItemRepo.deleteById(subItemId);
    }
}
