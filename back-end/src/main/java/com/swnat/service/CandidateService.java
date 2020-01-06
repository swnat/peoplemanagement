package com.swnat.service;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Candidate;

public interface CandidateService extends IGenericService<Candidate, Long> {

    /**
     * Get all by filter
     * @param filter
     * @param page
     * @param size
     * @return
     */
    PaginationResponse<Candidate> findByFilter(String filter, int page, int size);

    Candidate getOne(Long id);

    void updateInterviewStatus(String id, String interviewStatus);
    void updateChallengeStatus(String id, String challengeStatus);
}