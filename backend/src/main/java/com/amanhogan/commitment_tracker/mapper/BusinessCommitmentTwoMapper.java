package com.amanhogan.commitment_tracker.mapper;

import com.amanhogan.commitment_tracker.io.BusinessCommitmentTwoDto;
import com.amanhogan.commitment_tracker.model.BusinessCommitmentTwo;

import java.util.List;
import java.util.stream.Collectors;

public final class BusinessCommitmentTwoMapper {
    private BusinessCommitmentTwoMapper() {
    }

    public static BusinessCommitmentTwoDto toDto(BusinessCommitmentTwo e) {
        if (e == null)
            return null;
        return new BusinessCommitmentTwoDto(
                e.getId(),
                e.getEventName(),
                e.getType(),
                e.getDone(),
                e.getStarted(),
                e.getFinished(),
                e.getRequired(),
                e.getDescription(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }

    public static BusinessCommitmentTwo toEntity(BusinessCommitmentTwoDto d) {
        if (d == null)
            return null;
        return BusinessCommitmentTwo.builder()
                .id(d.id())
                .eventName(d.eventName())
                .type(d.type())
                .done(d.done())
                .started(d.started())
                .finished(d.finished())
                .required(d.required())
                .description(d.description())
                .build();
    }

    public static List<BusinessCommitmentTwoDto> toDtoList(List<BusinessCommitmentTwo> list) {
        return list.stream().map(BusinessCommitmentTwoMapper::toDto).collect(Collectors.toList());
    }
}
