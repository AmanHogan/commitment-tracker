package com.amanhogan.commitment_tracker.repository.development;

import org.springframework.data.jpa.repository.JpaRepository;

import com.amanhogan.commitment_tracker.model.development.ActionItem;

public interface ActionItemRepository extends JpaRepository<ActionItem, Integer> {
}
