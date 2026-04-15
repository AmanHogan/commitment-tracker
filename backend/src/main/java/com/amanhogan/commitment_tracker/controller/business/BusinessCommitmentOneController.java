package com.amanhogan.commitment_tracker.controller.business;

import com.amanhogan.commitment_tracker.io.business.BusinessCommitmentOneDto;
import com.amanhogan.commitment_tracker.mapper.business.BusinessCommitmentOneMapper;
import com.amanhogan.commitment_tracker.model.business.BusinessCommitmentOne;
import com.amanhogan.commitment_tracker.service.business.BusinessCommitmentOneService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bcomm1")
@RequiredArgsConstructor
public class BusinessCommitmentOneController {

    private final BusinessCommitmentOneService businessCommitmentOneService;

    @GetMapping
    public ResponseEntity<List<BusinessCommitmentOneDto>> getAll() {
        List<BusinessCommitmentOne> entities = businessCommitmentOneService.findAll();
        return ResponseEntity.ok(BusinessCommitmentOneMapper.toDtoList(entities));
    }

    @PostMapping
    public ResponseEntity<BusinessCommitmentOneDto> create(@RequestBody BusinessCommitmentOneDto dto) {
        BusinessCommitmentOne entity = BusinessCommitmentOneMapper.toEntity(dto);
        BusinessCommitmentOne saved = businessCommitmentOneService.create(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(BusinessCommitmentOneMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusinessCommitmentOneDto> update(@PathVariable Integer id,
            @RequestBody BusinessCommitmentOneDto dto) {
        BusinessCommitmentOne entity = BusinessCommitmentOneMapper.toEntity(dto);
        BusinessCommitmentOne updated = businessCommitmentOneService.update(id, entity);
        return ResponseEntity.ok(BusinessCommitmentOneMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        businessCommitmentOneService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        businessCommitmentOneService.deleteAll();
        return ResponseEntity.noContent().build();
    }
}
