package com.swnat.controller;

import com.swnat.dto.Approval;
import com.swnat.dto.ChallengeFormRequest;
import com.swnat.dto.ChallengeWFDTO;
import com.swnat.model.Challenge;
import com.swnat.service.ChallengeWorkflowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequestMapping("/api/v1/challenge-workflow")
public class ChallengeWorkflowController {

    @Autowired
    private ChallengeWorkflowService service;

    @PostMapping("/start-process")
    public Challenge startProcess(@RequestBody ChallengeWFDTO challengeWF) {
        return service.startProcess(challengeWF);
    }

    @PostMapping("/complete-task-form")
    public void completeTaskForm(@RequestBody ChallengeFormRequest challengeForm) {
        service.completeTaskForm(challengeForm);
    }

    @PostMapping("/complete-process")
    public Boolean completeProcess(@RequestBody Approval approval) {
        return service.completeProcess(approval);
    }
}