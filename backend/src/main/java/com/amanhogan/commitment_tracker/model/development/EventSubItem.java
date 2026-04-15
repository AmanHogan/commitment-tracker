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
@Table(name = "event_sub_items")
@EntityListeners(AuditingEntityListener.class)
public class EventSubItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private DevelopmentCommitmentTwo event;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String subEventName;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate started;

    private LocalDate finished;

    private Boolean done;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
