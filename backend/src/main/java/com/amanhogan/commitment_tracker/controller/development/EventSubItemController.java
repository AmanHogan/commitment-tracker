package com.amanhogan.commitment_tracker.controller.development;

import com.amanhogan.commitment_tracker.io.development.EventSubItemDto;
import com.amanhogan.commitment_tracker.service.development.EventSubItemService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dcomm2")
@RequiredArgsConstructor
public class EventSubItemController {

    private final EventSubItemService service;

    @GetMapping("/{eventId}/sub-events")
    public ResponseEntity<List<EventSubItemDto>> listForEvent(@PathVariable Integer eventId) {
        return ResponseEntity.ok(service.findByEventId(eventId));
    }

    @PostMapping("/{eventId}/sub-events")
    public ResponseEntity<EventSubItemDto> create(
            @PathVariable Integer eventId,
            @RequestBody EventSubItemDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(eventId, dto));
    }

    @PutMapping("/sub-events/{subItemId}")
    public ResponseEntity<EventSubItemDto> update(
            @PathVariable Integer subItemId,
            @RequestBody EventSubItemDto dto) {
        return ResponseEntity.ok(service.update(subItemId, dto));
    }

    @DeleteMapping("/sub-events/{subItemId}")
    public ResponseEntity<Void> delete(@PathVariable Integer subItemId) {
        service.delete(subItemId);
        return ResponseEntity.noContent().build();
    }
}
