package com.swnat.service;
import com.swnat.model.Challenge;

public interface ChallengeService extends IGenericService<Challenge, Long> {
    Challenge getOne(Long id);
    
}