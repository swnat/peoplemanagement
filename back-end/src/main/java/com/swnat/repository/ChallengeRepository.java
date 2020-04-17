package com.swnat.repository;

import com.swnat.model.Challenge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    /**
     * In the native query it is asked if the candidate has a challenge and retains a value boolean 
     * @param candidate_id
     * @return {@link boolean } 
     */

    @Query(value = "SELECT CASE WHEN (count(*) > 0) THEN true ELSE false END FROM MANAGEMENT.CHALLENGE WHERE CANDIDATE_ID = ?1", 
    nativeQuery = true)
    boolean findByChallengeCandidateId(Long candidate_id);
}

