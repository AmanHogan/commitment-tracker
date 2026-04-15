package com.amanhogan.commitment_tracker.mapper.business;

import java.util.List;

import com.amanhogan.commitment_tracker.io.development.OneOnOneDto;
import com.amanhogan.commitment_tracker.model.development.OneOnOne;

public final class OneOnOneMapper {
    private OneOnOneMapper() {

    }

    public static OneOnOne toEntity(OneOnOneDto dto) {
        if (dto == null) {
            return null;
        }

        return OneOnOne.builder()
                .id(dto.id())
                .documentDate(dto.documentDate())
                .businessPartnerWork(dto.businessPartnerWork())
                .workloadConcerns(dto.workloadConcerns())
                .tdpContributions(dto.tdpContributions())
                .utilizationPercentage(dto.utilizationPercentage())
                .trainingSkills(dto.trainingSkills())
                .pursuingDegrees(dto.pursuingDegrees())
                .compliancePercentage(dto.compliancePercentage())
                .ehsTrainingPercentage(dto.ehsTrainingPercentage())
                .growthHubProgress(dto.growthHubProgress())
                .successPathwaysUpdated(dto.successPathwaysUpdated())
                .contingencyTrainingPercentage(dto.contingencyTrainingPercentage())
                .innovationEvents(dto.innovationEvents())
                .accomplishments(dto.accomplishments())
                .challenges(dto.challenges())
                .goals(dto.goals())
                .questions(dto.questions())
                .receivingSupport(dto.receivingSupport())
                .additionalItems(dto.additionalItems())
                .outOfOfficePlans(dto.outOfOfficePlans())
                .build();

    }

    public static OneOnOneDto toDto(OneOnOne o) {
        if (o == null) {
            return null;
        }

        return new OneOnOneDto(
                o.getId(),
                o.getDocumentDate(),
                o.getBusinessPartnerWork(),
                o.getWorkloadConcerns(),
                o.getTdpContributions(),
                o.getUtilizationPercentage(),
                o.getTrainingSkills(),
                o.getPursuingDegrees(),
                o.getCompliancePercentage(),
                o.getEhsTrainingPercentage(),
                o.getGrowthHubProgress(),
                o.getSuccessPathwaysUpdated(),
                o.getContingencyTrainingPercentage(),
                o.getInnovationEvents(),
                o.getAccomplishments(),
                o.getChallenges(),
                o.getGoals(),
                o.getQuestions(),
                o.getReceivingSupport(),
                o.getAdditionalItems(),
                o.getOutOfOfficePlans());
    }

    public static List<OneOnOneDto> toDtoList(List<OneOnOne> list) {
        return list.stream().map(OneOnOneMapper::toDto).toList();
    }
}
