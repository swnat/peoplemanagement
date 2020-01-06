package com.swnat.repository;


import com.swnat.model.StatusChallenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusChallengeRepository extends JpaRepository<StatusChallenge, Long> {

}