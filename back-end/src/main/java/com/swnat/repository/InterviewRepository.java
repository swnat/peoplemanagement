package com.swnat.repository;

import com.swnat.model.Interview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InterviewRepository extends JpaRepository<Interview, Long> {

    /**
     * Get list of interview by any of the following criteria:
     * id candidate
     *
     * @return {@link Page <Interview>}
     */
    @Query("select i from Interview i where documento like %:id_candidate%")
    Page<Interview> findAllByIdCandidate(@Param("id_candidate") String idNumber, Pageable pageable);

}
