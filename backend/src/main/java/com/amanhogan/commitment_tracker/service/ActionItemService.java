package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.ActionItem;

import java.util.List;

public interface ActionItemService {
    List<ActionItem> findAll();

    ActionItem create(ActionItem actionItem);

    ActionItem update(Integer id, ActionItem actionItem);

    void delete(Integer id);
}
