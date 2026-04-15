package com.amanhogan.commitment_tracker.repository.development;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.amanhogan.commitment_tracker.model.development.EventSubItem;

import java.util.List;

@Repository
public interface EventSubItemRepository extends JpaRepository<EventSubItem, Integer> {

    List<EventSubItem> findByEventId(Integer eventId);
}
