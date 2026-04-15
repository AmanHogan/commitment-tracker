package com.amanhogan.commitment_tracker.repository.business;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.amanhogan.commitment_tracker.model.business.SubEvent;

import java.util.List;

@Repository
public interface SubEventRepository extends JpaRepository<SubEvent, Integer> {
    List<SubEvent> findByEventId(Integer eventId);
}
