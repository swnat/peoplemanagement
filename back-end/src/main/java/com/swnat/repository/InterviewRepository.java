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

    /**
     * In the native query it is asked if the candidate has a interview and retains a value boolean 
     * @param candidate_id
     * @return {@link boolean }
     */
    
    @Query(value = "SELECT CASE WHEN (count(*) > 0) THEN true ELSE false END FROM MANAGEMENT.INTERVIEW WHERE CANDIDATE_ID = ?1", 
    nativeQuery = true)
    boolean findByInterViewCandidateId(Long candidate_id);

}
