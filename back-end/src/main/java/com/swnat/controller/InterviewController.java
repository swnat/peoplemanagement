package com.swnat.controller;

import java.util.List;

import javax.validation.Valid;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Interview;
import com.swnat.model.StatusCandidate;
import com.swnat.repository.InterviewRepository;
import com.swnat.repository.StatusCandidateRepository;
import com.swnat.service.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping("/api/v1/interview")
public class InterviewController {
    
    private InterviewService interviewService;
    private InterviewRepository interviewRepository;

    @Autowired
    private StatusCandidateRepository statusCandidateRepository;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }
    @ApiOperation(value = "Create a interview", notes = "Create a new interview.")
    @PostMapping("/")
    public Interview saveInterview(@Valid @RequestBody Interview interview) {
        return interviewService.add(interview);
    }

    @ApiOperation(value = "Get list of interviews", notes = "Get list of interviews by filtering with a text and returning paginated.")
    @GetMapping("/")
    public PaginationResponse<Interview> getAllCandidate(@RequestParam(value = "filter", required = false) String filter, @RequestParam("page") int page, @RequestParam("size") int size) {
        return interviewService.findByFilter(filter, page, size);
    }


    @ApiOperation(value = "Get an interview", notes = "Get an interview by id.")
    @GetMapping("/{id}")
    public Interview getInterview(@PathVariable Long id) {
        return interviewService.getOne(id);
    }

    @GetMapping("/interview-list")
    public List<Interview> getInterview() {
        return (List<Interview>) interviewRepository.findAll();
    }
 
    @PostMapping("/interview")
    void addUser(@RequestBody Interview interview) {
        interviewRepository.save(interview);
    }

    @GetMapping("/status-candidate")
    public List<StatusCandidate> getStatusCandidates() {
        return (List<StatusCandidate>) statusCandidateRepository.findAll();
    }

    @ApiOperation(value = "Edit a interview", notes = "Update data of an existing interview")
    @PutMapping("/{id}")
    public Interview udpateInterview(@Valid @RequestBody Interview interview, @PathVariable Long id) {
        return interviewService.update(id, interview);
    }
}

