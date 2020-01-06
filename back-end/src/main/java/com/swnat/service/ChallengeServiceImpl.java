package com.swnat.service;

import com.swnat.model.Challenge;
import com.swnat.repository.ChallengeRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChallengeServiceImpl extends GenericService<Challenge, Long> implements ChallengeService {

    private ChallengeRepository challengeRepository;

    public ChallengeServiceImpl(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }

    @Override
    public JpaRepository<Challenge, Long> getRepository() {
        return this.challengeRepository;
    }

    
    @Override
    public Challenge getOne(Long id) {
        Challenge challenge = challengeRepository.getOne(id);
        return challenge;
    }
    
    
    

}