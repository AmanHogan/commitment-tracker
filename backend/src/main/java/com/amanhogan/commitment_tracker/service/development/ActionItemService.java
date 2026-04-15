package com.amanhogan.commitment_tracker.service.development;

import com.amanhogan.commitment_tracker.model.development.ActionItem;
import com.amanhogan.commitment_tracker.repository.development.ActionItemRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActionItemService {

    private final ActionItemRepository actionItemRepository;

    public List<ActionItem> findAll() {
        return actionItemRepository.findAll();
    }

    public ActionItem create(ActionItem actionItem) {
        return actionItemRepository.save(actionItem);
    }

    public ActionItem update(Integer id, ActionItem actionItem) {
        return actionItemRepository.findById(id)
                .map(existing -> {
                    existing.setName(actionItem.getName());
                    existing.setDescription(actionItem.getDescription());
                    existing.setCriticality(actionItem.getCriticality());
                    existing.setDateStarted(actionItem.getDateStarted());
                    existing.setDateFinished(actionItem.getDateFinished());
                    existing.setCompleted(actionItem.isCompleted());
                    return actionItemRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("ActionItem not found with id " + id));
    }

    public void delete(Integer id) {
        if (actionItemRepository.existsById(id)) {
            actionItemRepository.deleteById(id);
        } else {
            throw new RuntimeException("ActionItem not found with id " + id);
        }
    }
}
