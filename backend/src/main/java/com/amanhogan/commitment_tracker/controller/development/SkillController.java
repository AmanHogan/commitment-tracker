package com.amanhogan.commitment_tracker.controller.development;

import com.amanhogan.commitment_tracker.model.development.Skill;
import com.amanhogan.commitment_tracker.service.development.SkillService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getAll() {
        return ResponseEntity.ok(skillService.findAll());
    }

    @PostMapping
    public ResponseEntity<Skill> create(@RequestBody Skill skill) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.create(skill));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable Integer id, @RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.update(id, skill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        skillService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
