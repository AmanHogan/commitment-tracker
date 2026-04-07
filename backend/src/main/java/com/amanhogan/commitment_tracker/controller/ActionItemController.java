package com.amanhogan.commitment_tracker.controller;

import com.amanhogan.commitment_tracker.model.ActionItem;
import com.amanhogan.commitment_tracker.service.ActionItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/action-items")
@RequiredArgsConstructor
public class ActionItemController {

    private final ActionItemService actionItemService;

    @GetMapping
    public ResponseEntity<List<ActionItem>> getAll() {
        return ResponseEntity.ok(actionItemService.findAll());
    }

    @PostMapping
    public ResponseEntity<ActionItem> create(@RequestBody ActionItem actionItem) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(actionItemService.create(actionItem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActionItem> update(@PathVariable Integer id,
            @RequestBody ActionItem actionItem) {
        return ResponseEntity.ok(actionItemService.update(id, actionItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        actionItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
