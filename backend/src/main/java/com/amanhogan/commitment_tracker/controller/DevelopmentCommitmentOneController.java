package com.amanhogan.commitment_tracker.controller;

import java.util.List;

import com.amanhogan.commitment_tracker.service.DevelopmentCommitmentOneService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.amanhogan.commitment_tracker.model.DevelopmentCommitmentOne;

@RestController
@RequestMapping("/api/dcomm1")
@RequiredArgsConstructor
public class DevelopmentCommitmentOneController {

    private final DevelopmentCommitmentOneService developmentCommitmentOneService;


    @GetMapping
    public ResponseEntity<List<DevelopmentCommitmentOne>> getAll() {
        return ResponseEntity.ok(developmentCommitmentOneService.findAll());
    }


    @PostMapping
    public ResponseEntity<DevelopmentCommitmentOne> create(@RequestBody DevelopmentCommitmentOne developmentCommitmentOne){
        return ResponseEntity.ok(developmentCommitmentOneService.create(developmentCommitmentOne));
    }
    

}
