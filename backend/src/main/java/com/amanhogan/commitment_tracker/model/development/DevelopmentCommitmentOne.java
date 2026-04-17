package com.amanhogan.commitment_tracker.model.development;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "development_commitment_one")
@EntityListeners(AuditingEntityListener.class)
public class DevelopmentCommitmentOne {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String itemName;

    @JsonIgnore
    @OneToMany(mappedBy = "developmentCommitmentOne", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningModule> modules;

    @Column(name = "item_date")
    private LocalDate itemDate;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
