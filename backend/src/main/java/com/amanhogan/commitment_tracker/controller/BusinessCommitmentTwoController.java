package com.amanhogan.commitment_tracker.controller;

import com.amanhogan.commitment_tracker.io.BusinessCommitmentTwoDto;
import com.amanhogan.commitment_tracker.io.SubEventDto;
import com.amanhogan.commitment_tracker.service.BusinessCommitmentTwoService;
import com.amanhogan.commitment_tracker.service.SubEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bcomm2")
@RequiredArgsConstructor
public class BusinessCommitmentTwoController {

    private final BusinessCommitmentTwoService businessCommitmentTwoService;
    private final SubEventService subEventService;

    @GetMapping
    public ResponseEntity<List<BusinessCommitmentTwoDto>> getAll() {
        return ResponseEntity.ok(businessCommitmentTwoService.findAll());
    }

    @PostMapping
    public ResponseEntity<BusinessCommitmentTwoDto> create(@RequestBody BusinessCommitmentTwoDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(businessCommitmentTwoService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessCommitmentTwoDto> update(@PathVariable Integer id,
            @RequestBody BusinessCommitmentTwoDto dto) {
        return ResponseEntity.ok(businessCommitmentTwoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        businessCommitmentTwoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        businessCommitmentTwoService.deleteAll();
        return ResponseEntity.noContent().build();
    }

    // ─── Sub-events ──────────────────────────────────────────────────────────

    @GetMapping("/{eventId}/sub-events")
    public ResponseEntity<List<SubEventDto>> listSubEvents(@PathVariable Integer eventId) {
        return ResponseEntity.ok(subEventService.findByEventId(eventId));
    }

    @PostMapping("/{eventId}/sub-events")
    public ResponseEntity<SubEventDto> createSubEvent(
            @PathVariable Integer eventId,
            @RequestBody SubEventDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subEventService.create(eventId, dto));
    }

    @PutMapping("/sub-events/{subEventId}")
    public ResponseEntity<SubEventDto> updateSubEvent(
            @PathVariable Integer subEventId,
            @RequestBody SubEventDto dto) {
        return ResponseEntity.ok(subEventService.update(subEventId, dto));
    }

    @DeleteMapping("/sub-events/{subEventId}")
    public ResponseEntity<Void> deleteSubEvent(@PathVariable Integer subEventId) {
        subEventService.delete(subEventId);
        return ResponseEntity.noContent().build();
    }
}
