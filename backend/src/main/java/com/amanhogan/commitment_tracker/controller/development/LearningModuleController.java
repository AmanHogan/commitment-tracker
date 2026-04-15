package com.amanhogan.commitment_tracker.controller.development;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.amanhogan.commitment_tracker.io.development.LearningModuleDto;
import com.amanhogan.commitment_tracker.service.development.LearningModuleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dcomm1")
@RequiredArgsConstructor
public class LearningModuleController {
    private final LearningModuleService learningModuleService;

    @PostMapping("/{itemId}/modules")
    public ResponseEntity<LearningModuleDto> createForItem(
            @PathVariable Integer itemId,
            @RequestBody LearningModuleDto dto) {
        LearningModuleDto created = learningModuleService.createForItem(itemId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{itemId}/modules")
    public ResponseEntity<List<LearningModuleDto>> listForItem(@PathVariable Integer itemId) {
        return ResponseEntity.ok(learningModuleService.findByItemId(itemId));
    }

    @PutMapping("/modules/{moduleId}")
    public ResponseEntity<LearningModuleDto> update(
            @PathVariable Integer moduleId,
            @RequestBody LearningModuleDto dto) {
        return ResponseEntity.ok(learningModuleService.update(moduleId, dto));
    }

    @DeleteMapping("/modules/{moduleId}")
    public ResponseEntity<Void> delete(@PathVariable Integer moduleId) {
        learningModuleService.delete(moduleId);
        return ResponseEntity.noContent().build();
    }
}