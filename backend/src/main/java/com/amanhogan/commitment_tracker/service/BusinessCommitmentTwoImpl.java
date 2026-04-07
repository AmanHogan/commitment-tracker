package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.io.BusinessCommitmentTwoDto;
import com.amanhogan.commitment_tracker.mapper.BusinessCommitmentTwoMapper;
import com.amanhogan.commitment_tracker.repository.BusinessCommitmentTwoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessCommitmentTwoImpl implements BusinessCommitmentTwoService {
    private final BusinessCommitmentTwoRepository businessCommitmentTwoRepository;

    @Override
    public List<BusinessCommitmentTwoDto> findAll() {
        return BusinessCommitmentTwoMapper.toDtoList(businessCommitmentTwoRepository.findAll());
    }

    @Override
    public BusinessCommitmentTwoDto create(BusinessCommitmentTwoDto dto) {
        var entity = BusinessCommitmentTwoMapper.toEntity(dto);
        return BusinessCommitmentTwoMapper.toDto(businessCommitmentTwoRepository.save(entity));
    }

    @Override
    public BusinessCommitmentTwoDto update(Integer id, BusinessCommitmentTwoDto dto) {
        return businessCommitmentTwoRepository.findById(id)
                .map(existing -> {
                    existing.setEventName(dto.eventName());
                    existing.setType(dto.type());
                    existing.setDone(dto.done());
                    existing.setStarted(dto.started());
                    existing.setFinished(dto.finished());
                    existing.setRequired(dto.required());
                    existing.setDescription(dto.description());
                    return BusinessCommitmentTwoMapper.toDto(businessCommitmentTwoRepository.save(existing));
                })
                .orElseThrow(() -> new RuntimeException("LeadershipEvent not found: " + id));
    }

    @Override
    public void delete(Integer id) {
        if (!businessCommitmentTwoRepository.existsById(id)) {
            throw new RuntimeException("LeadershipEvent not found: " + id);
        }
        businessCommitmentTwoRepository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        businessCommitmentTwoRepository.deleteAll();
    }
}
