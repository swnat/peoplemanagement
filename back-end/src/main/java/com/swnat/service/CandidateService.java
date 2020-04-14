package com.swnat.service;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Candidate;

import org.springframework.web.multipart.MultipartFile;


public interface CandidateService extends IGenericService<Candidate, Long> {

    /**
     * Get all by filter
     * @param filter
     * @param page
     * @param size
     * @param sortBy
     * @return
     */
    PaginationResponse<Candidate> findByFilter(String filter, int page, int size, String sortBy);

    Candidate getOne(Long id);

    void updateInterviewStatus(String id, String interviewStatus);
    void updateChallengeStatus(String id, String challengeStatus);
    String uploadImage(MultipartFile image);
    void removeImage(String urlImage);
}