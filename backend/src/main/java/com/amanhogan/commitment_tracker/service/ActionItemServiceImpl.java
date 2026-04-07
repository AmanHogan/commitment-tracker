package com.amanhogan.commitment_tracker.service;

import com.amanhogan.commitment_tracker.model.ActionItem;
import com.amanhogan.commitment_tracker.repository.ActionItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActionItemServiceImpl implements ActionItemService {

    private final ActionItemRepository actionItemRepository;

    @Override
    public List<ActionItem> findAll() {
        return actionItemRepository.findAll();
    }

    @Override
    public ActionItem create(ActionItem actionItem) {
        return actionItemRepository.save(actionItem);
    }

    @Override
    public ActionItem update(Integer id, ActionItem actionItem) {
        return actionItemRepository.findById(id)
                .map(existing -> {
                    existing.setName(actionItem.getName());
                    existing.setCriticality(actionItem.getCriticality());
                    existing.setDateStarted(actionItem.getDateStarted());
                    existing.setDateFinished(actionItem.getDateFinished());
                    return actionItemRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("ActionItem not found with id " + id));
    }

    @Override
    public void delete(Integer id) {
        if (actionItemRepository.existsById(id)) {
            actionItemRepository.deleteById(id);
        } else {
            throw new RuntimeException("ActionItem not found with id " + id);
        }
    }
}
