package com.amanhogan.commitment_tracker.controller.development;

import com.amanhogan.commitment_tracker.io.development.DevelopmentCommitmentTwoDto;
import com.amanhogan.commitment_tracker.service.development.DevelopmentCommitmentTwoService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dcomm2")
@RequiredArgsConstructor
public class DevelopmentCommitmentTwoController {

    private final DevelopmentCommitmentTwoService service;

    @GetMapping
    public ResponseEntity<List<DevelopmentCommitmentTwoDto>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<DevelopmentCommitmentTwoDto> create(@RequestBody DevelopmentCommitmentTwoDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DevelopmentCommitmentTwoDto> update(
            @PathVariable Integer id,
            @RequestBody DevelopmentCommitmentTwoDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
