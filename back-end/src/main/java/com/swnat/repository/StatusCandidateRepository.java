package com.swnat.repository;


import com.swnat.model.StatusCandidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusCandidateRepository extends JpaRepository<StatusCandidate, Long> {

}