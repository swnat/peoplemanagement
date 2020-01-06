package com.swnat.repository;

import com.swnat.model.Candidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    /**
     * Get list of candidates by any of the following criteria:
     * name, lastName
     *
     * @return {@link Page <Candidate>}
     */
    @Query("select c from Candidate c where upper(concat(name,' ',lastName)) like %:name% or idNumber like %:id_number%")
    Page<Candidate> findAllByNameContainsOrLastNameContains(@Param("name") String name, @Param("id_number") String idNumber, Pageable pageable);

}
