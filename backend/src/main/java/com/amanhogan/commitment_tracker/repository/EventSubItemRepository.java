package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.EventSubItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventSubItemRepository extends JpaRepository<EventSubItem, Integer> {

    List<EventSubItem> findByEventId(Integer eventId);
}
