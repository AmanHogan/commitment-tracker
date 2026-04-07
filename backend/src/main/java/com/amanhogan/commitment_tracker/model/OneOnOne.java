package com.amanhogan.commitment_tracker.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.Instant;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "one_on_one_documents")
public class OneOnOne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate documentDate;

    private String businessPartnerWork;

    private String workloadConcerns;

    private String tdpContributions;

    private String utilizationPercentage;

    private String trainingSkills;

    private String pursuingDegrees;

    private String compliancePercentage;

    private String ehsTrainingPercentage;

    private String growthHubProgress;

    private String successPathwaysUpdated;

    private String contingencyTrainingPercentage;

    private String innovationEvents;

    private String accomplishments;

    private String challenges;

    private String goals;

    private String questions;

    private String receivingSupport;

    private String additionalItems;

    private String outOfOfficePlans;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
