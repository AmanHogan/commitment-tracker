package com.amanhogan.commitment_tracker.service.business;

import com.amanhogan.commitment_tracker.io.business.SubEventDto;
import com.amanhogan.commitment_tracker.mapper.business.SubEventMapper;
import com.amanhogan.commitment_tracker.model.business.BusinessCommitmentTwo;
import com.amanhogan.commitment_tracker.model.business.SubEvent;
import com.amanhogan.commitment_tracker.repository.business.BusinessCommitmentTwoRepository;
import com.amanhogan.commitment_tracker.repository.business.SubEventRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubEventService {

    private final SubEventRepository subEventRepository;
    private final BusinessCommitmentTwoRepository eventRepository;

    @Transactional(readOnly = true)
    public List<SubEventDto> findByEventId(Integer eventId) {
        return SubEventMapper.toDtoList(subEventRepository.findByBusinessCommitmentTwoId(eventId));
    }

    @Transactional
    public SubEventDto create(Integer eventId, SubEventDto dto) {
        BusinessCommitmentTwo event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Leadership event not found: " + eventId));
        SubEvent subEvent = SubEventMapper.toEntity(dto);
        subEvent.setBusinessCommitmentTwo(event);
        return SubEventMapper.toDto(subEventRepository.save(subEvent));
    }

    @Transactional
    public SubEventDto update(Integer subEventId, SubEventDto dto) {
        SubEvent subEvent = subEventRepository.findById(subEventId)
                .orElseThrow(() -> new EntityNotFoundException("Sub-event not found: " + subEventId));
        subEvent.setSubEventName(dto.subEventName());
        subEvent.setDescription(dto.description());
        subEvent.setStarted(dto.started());
        subEvent.setFinished(dto.finished());
        subEvent.setDone(dto.done());
        return SubEventMapper.toDto(subEventRepository.save(subEvent));
    }

    @Transactional
    public void delete(Integer subEventId) {
        subEventRepository.deleteById(subEventId);
    }
}
