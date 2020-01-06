package com.swnat.controller;

import com.swnat.dto.Approval;
import com.swnat.dto.InterviewFormRequest;
import com.swnat.dto.InterviewWFDTO;
import com.swnat.model.Interview;
import com.swnat.service.InterviewWorkflowService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/interview-workflow")
public class InterviewWorkflowController {

    @Autowired
    private InterviewWorkflowService service;

    @PostMapping("/start-process")
    public Interview startProcess(@RequestBody InterviewWFDTO interviewWF) {
        return service.startProcess(interviewWF);
    }

    @PostMapping("/complete-task-form")
    public void completeTaskForm(@RequestBody InterviewFormRequest interviewForm) {
        service.completeTaskForm(interviewForm);
    }

    @PostMapping("/complete-process")
    public Boolean completeProcess(@RequestBody Approval approval) {
        return service.completeProcess(approval);
    }
}