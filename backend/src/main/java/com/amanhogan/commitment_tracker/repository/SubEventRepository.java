package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.SubEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubEventRepository extends JpaRepository<SubEvent, Integer> {
    List<SubEvent> findByEventId(Integer eventId);
}
