package com.amanhogan.commitment_tracker.model.business;

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

@Entity
@Table(name = "leadership_subevents")
@EntityListeners(AuditingEntityListener.class)
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private BusinessCommitmentTwo event;

    @Column(name = "subevent_name", nullable = false, columnDefinition = "TEXT")
    private String subEventName;

    private Boolean done;

    private LocalDate started;

    private LocalDate finished;

    @Column(columnDefinition = "TEXT")
    private String description;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
