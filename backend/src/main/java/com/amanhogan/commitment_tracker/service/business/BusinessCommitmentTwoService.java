package com.amanhogan.commitment_tracker.service.business;

import com.amanhogan.commitment_tracker.io.business.BusinessCommitmentTwoDto;
import com.amanhogan.commitment_tracker.mapper.business.BusinessCommitmentTwoMapper;
import com.amanhogan.commitment_tracker.repository.business.BusinessCommitmentTwoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BusinessCommitmentTwoService {
    private final BusinessCommitmentTwoRepository businessCommitmentTwoRepository;

    public List<BusinessCommitmentTwoDto> findAll() {
        return BusinessCommitmentTwoMapper.toDtoList(businessCommitmentTwoRepository.findAll());
    }

    public BusinessCommitmentTwoDto create(BusinessCommitmentTwoDto dto) {
        var entity = BusinessCommitmentTwoMapper.toEntity(dto);
        return BusinessCommitmentTwoMapper.toDto(businessCommitmentTwoRepository.save(entity));
    }

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

    public void delete(Integer id) {
        if (!businessCommitmentTwoRepository.existsById(id)) {
            throw new RuntimeException("LeadershipEvent not found: " + id);
        }
        businessCommitmentTwoRepository.deleteById(id);
    }

    public void deleteAll() {
        businessCommitmentTwoRepository.deleteAll();
    }
}
