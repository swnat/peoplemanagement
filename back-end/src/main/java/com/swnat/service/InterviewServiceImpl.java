package com.swnat.service;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Interview;
import com.swnat.repository.InterviewRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class InterviewServiceImpl extends GenericService<Interview, Long> implements InterviewService {

    private InterviewRepository interviewRepository;

    public InterviewServiceImpl(InterviewRepository interviewRepository) {
        this.interviewRepository = interviewRepository;
    }

    @Override
    public JpaRepository<Interview, Long> getRepository() {
        return this.interviewRepository;
    }

    @Override
    public PaginationResponse<Interview> findByFilter(String filter, int page, int size) {
        Page<Interview> searchResult;
        PageRequest pageRequest = PageRequest.of(page, size);

        if (filter == null || filter.isEmpty()) {
            searchResult = interviewRepository.findAll(pageRequest);
        } else {
            searchResult = interviewRepository.findAllByIdCandidate(filter, pageRequest);
        }

        PaginationResponse<Interview> response = new PaginationResponse<>();
        response.setContent(searchResult.getContent());
        response.setTotalCount(searchResult.getTotalElements());
        return response;
    }

}