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

    @Column(columnDefinition = "TEXT")
    private String businessPartnerWork;

    @Column(columnDefinition = "TEXT")
    private String workloadConcerns;

    @Column(columnDefinition = "TEXT")
    private String tdpContributions;

    @Column(columnDefinition = "TEXT")
    private String utilizationPercentage;

    @Column(columnDefinition = "TEXT")
    private String trainingSkills;

    @Column(columnDefinition = "TEXT")
    private String pursuingDegrees;

    @Column(columnDefinition = "TEXT")
    private String compliancePercentage;

    @Column(columnDefinition = "TEXT")
    private String ehsTrainingPercentage;

    @Column(columnDefinition = "TEXT")
    private String growthHubProgress;

    @Column(columnDefinition = "TEXT")
    private String successPathwaysUpdated;

    @Column(columnDefinition = "TEXT")
    private String contingencyTrainingPercentage;

    @Column(columnDefinition = "TEXT")
    private String innovationEvents;

    @Column(columnDefinition = "TEXT")
    private String accomplishments;

    @Column(columnDefinition = "TEXT")
    private String challenges;

    @Column(columnDefinition = "TEXT")
    private String goals;

    @Column(columnDefinition = "TEXT")
    private String questions;

    @Column(columnDefinition = "TEXT")
    private String receivingSupport;

    @Column(columnDefinition = "TEXT")
    private String additionalItems;

    @Column(columnDefinition = "TEXT")
    private String outOfOfficePlans;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
