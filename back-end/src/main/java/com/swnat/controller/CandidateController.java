package com.swnat.controller;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Candidate;
import com.swnat.service.CandidateService;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/candidates")
public class CandidateController {

    private CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @ApiOperation(value = "Get list of candidates", notes = "Get list of candidates by filtering with a text and returning paginated.")
    @GetMapping("/")
    public PaginationResponse<Candidate> getAllCandidate(@RequestParam(value = "filter", required = false) String filter, @RequestParam("page") int page, @RequestParam("size") int size) {
        //System.out.println("lista de candidatos");
        return candidateService.findByFilter(filter, page, size);
    }

    @ApiOperation(value = "Create a candidate", notes = "Create a new candidate.")
    @PostMapping("/")
    public Candidate saveCandidate(@Valid @RequestBody Candidate candidate) {
        return candidateService.add(candidate);
    }

    @ApiOperation(value = "Edit a candidate", notes = "Update data of an existing candidate.")
    @PutMapping("/{id}")
    public Candidate updateCandidate(@Valid @RequestBody Candidate candidate, @PathVariable Long id) {
        return candidateService.update(id, candidate);
    }

    @ApiOperation(value = "Get an candidate", notes = "Get an candidate by id.")
    @GetMapping("/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidateService.getOne(id);
    }
    
}
