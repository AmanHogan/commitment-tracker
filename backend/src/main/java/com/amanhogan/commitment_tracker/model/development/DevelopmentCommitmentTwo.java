package com.amanhogan.commitment_tracker.model.development;

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

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "innovation_events")
@EntityListeners(AuditingEntityListener.class)
public class DevelopmentCommitmentTwo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private String type;

    private String description;

    private LocalDate started;

    private LocalDate finished;

    @Column(nullable = false)
    private Boolean done;

    @Column(nullable = false)
    private Boolean required;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
