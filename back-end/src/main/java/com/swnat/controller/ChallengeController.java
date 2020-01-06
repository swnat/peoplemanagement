package com.swnat.controller;

import java.util.List;

import javax.validation.Valid;

import com.swnat.model.Challenge;
import com.swnat.model.StatusChallenge;
import com.swnat.repository.ChallengeRepository;
import com.swnat.repository.StatusChallengeRepository;
import com.swnat.service.ChallengeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/v1/challenge")
public class ChallengeController {
    
    private ChallengeService challengeService;
    private ChallengeRepository challengeRepository;
    @Autowired
    private StatusChallengeRepository statusChallengeRepository;


    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }
    @ApiOperation(value = "Create a challenge", notes = "Create a new challenge.")
    @PostMapping("/")
    public Challenge saveChallenge(@Valid @RequestBody Challenge challenge) {
        return challengeService.add(challenge);
    }

    @ApiOperation(value = "Get a challenge", notes = "Get an challenge by id.")
    @GetMapping("/{id}")
    public Challenge getChallenge(@PathVariable Long id) {
        return challengeService.getOne(id);
    }

    @ApiOperation(value = "Edit a challenge", notes = "Update data of an existing challenge")
    @PutMapping("/{id}")
    public Challenge udpateChallenge(@Valid @RequestBody Challenge challenge, @PathVariable Long id) {
        return challengeService.update(id, challenge);
    }

    @GetMapping("/status-challenge")
    public List<StatusChallenge> getStatusChallenge() {
        return (List<StatusChallenge>) statusChallengeRepository.findAll();
    }
    @PostMapping("/challenge")
    void addUser(@RequestBody Challenge challenge) {
        challengeRepository.save(challenge);
    }
    @GetMapping("/challenge-list")
    public List<Challenge> getChallenges() {
        return (List<Challenge>) challengeRepository.findAll();
    }
}