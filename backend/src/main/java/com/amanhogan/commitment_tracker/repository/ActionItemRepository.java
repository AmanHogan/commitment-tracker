package com.amanhogan.commitment_tracker.repository;

import com.amanhogan.commitment_tracker.model.ActionItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionItemRepository extends JpaRepository<ActionItem, Integer> {
}
