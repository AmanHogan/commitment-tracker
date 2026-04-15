package com.amanhogan.commitment_tracker.service.development;

import com.amanhogan.commitment_tracker.io.development.DevelopmentCommitmentTwoDto;
import com.amanhogan.commitment_tracker.mapper.development.DevelopmentCommitmentTwoMapper;
import com.amanhogan.commitment_tracker.model.development.DevelopmentCommitmentTwo;
import com.amanhogan.commitment_tracker.repository.development.DevelopmentCommitmentTwoRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DevelopmentCommitmentTwoService  {

    private final DevelopmentCommitmentTwoRepository eventRepo;

    @Transactional(readOnly = true)
    public List<DevelopmentCommitmentTwoDto> findAll() {
        return DevelopmentCommitmentTwoMapper.toDtoList(eventRepo.findAll());
    }

    @Transactional
    public DevelopmentCommitmentTwoDto create(DevelopmentCommitmentTwoDto dto) {
        DevelopmentCommitmentTwo entity = DevelopmentCommitmentTwoMapper.toEntity(dto);
        return DevelopmentCommitmentTwoMapper.toDto(eventRepo.save(entity));
    }

    @Transactional
    public DevelopmentCommitmentTwoDto update(Integer id, DevelopmentCommitmentTwoDto dto) {
        DevelopmentCommitmentTwo entity = eventRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        entity.setEventName(dto.eventName());
        entity.setType(dto.type());
        entity.setDescription(dto.description());
        entity.setStarted(dto.started());
        entity.setFinished(dto.finished());
        entity.setDone(dto.done());
        entity.setRequired(dto.required());
        return DevelopmentCommitmentTwoMapper.toDto(eventRepo.save(entity));
    }

    @Transactional
    public void delete(Integer id) {
        eventRepo.deleteById(id);
    }
}
