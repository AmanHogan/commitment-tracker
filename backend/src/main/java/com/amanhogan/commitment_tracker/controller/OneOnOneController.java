package com.amanhogan.commitment_tracker.controller;

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

import com.amanhogan.commitment_tracker.model.OneOnOne;
import com.amanhogan.commitment_tracker.service.OneOnOneService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/one-on-one")
@RequiredArgsConstructor
public class OneOnOneController {
    private final OneOnOneService oneOnOneService;

    @GetMapping
    public ResponseEntity<List<OneOnOne>> getAll() {
        return ResponseEntity.ok(oneOnOneService.findAll());
    }

    @PostMapping
    public ResponseEntity<OneOnOne> create(@RequestBody OneOnOne oneOnOne) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(oneOnOneService.create(oneOnOne));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OneOnOne> update(@PathVariable Integer id,
            @RequestBody OneOnOne oneOnOne) {
        return ResponseEntity.ok(oneOnOneService.update(id, oneOnOne));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        oneOnOneService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        oneOnOneService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
