package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.DevelopmentCommitmentTwoDto;
import com.amanhogan.commitment_tracker.mapper.DevelopmentCommitmentTwoMapper;
import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentTwo;
import com.amanhogan.commitment_tracker.repository.DevelopmentCommitmentTwoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DevelopmentCommitmentTwoServiceImpl implements DevelopmentCommitmentTwoService {

    private final DevelopmentCommitmentTwoRepository eventRepo;

    @Override
    @Transactional(readOnly = true)
    public List<DevelopmentCommitmentTwoDto> findAll() {
        return DevelopmentCommitmentTwoMapper.toDtoList(eventRepo.findAll());
    }

    @Override
    @Transactional
    public DevelopmentCommitmentTwoDto create(DevelopmentCommitmentTwoDto dto) {
        DevelopmentCommitmentTwo entity = DevelopmentCommitmentTwoMapper.toEntity(dto);
        return DevelopmentCommitmentTwoMapper.toDto(eventRepo.save(entity));
    }

    @Override
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

    @Override
    @Transactional
    public void delete(Integer id) {
        eventRepo.deleteById(id);
    }
}
