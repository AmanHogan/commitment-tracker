package com.amanhogan.commitment_tracker.io.development;

import java.time.LocalDate;

public record OneOnOneDto(
                Integer id,
                LocalDate documentDate,
                String businessPartnerWork,
                String workloadConcerns,
                String tdpContributions,
                String utilizationPercentage,
                String trainingSkills,
                String pursuingDegrees,
                String compliancePercentage,
                String ehsTrainingPercentage,
                String growthHubProgress,
                String successPathwaysUpdated,
                String contingencyTrainingPercentage,
                String innovationEvents,
                String accomplishments,
                String challenges,
                String goals,
                String questions,
                String receivingSupport,
                String additionalItems,
                String outOfOfficePlans) {
}
