package com.swnat.service;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Interview;

public interface InterviewService extends IGenericService<Interview, Long> {

    /**
     * Get all by filter
     * @param filter
     * @param page
     * @param size
     * @return
     */
    PaginationResponse<Interview> findByFilter(String filter, int page, int size);

}