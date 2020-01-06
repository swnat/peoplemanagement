package com.swnat;

import java.util.Date;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.swnat.model.Candidate;
import com.swnat.model.Challenge;
import com.swnat.model.Interview;
import com.swnat.model.StatusCandidate;
import com.swnat.model.StatusChallenge;
import com.swnat.model.User;

public class TestUtils {
    public static final String INTERVIEW_URL = "http://localhost:8080/api/v1/interview/";
    public static final String CANDIDATE_URL = "http://localhost:8080/api/v1/candidates/";
    public static final String CHALLENGE_URL = "http://localhost:8080/api/v1/challenge/";
    public static final String RECORD_URL = "http://localhost:8080/api/v1/record/";
    public static final String LOGIN_URL = "http://localhost:8080/api/v1/login/";
    public static final String USER_URL = "http://localhost:8080/api/v1/user/";

    private static final ObjectMapper mapper = new ObjectMapper();

    public static Interview buildInterviewTest() {
        Interview interview = new Interview();
        interview.setComment("test");
        Candidate candidate = new Candidate();
        
        candidate.setDateOfBirth(new Date());
        candidate.setEmail("string");
        
        candidate.setIdNumber("string");
        candidate.setLastName("string");
        candidate.setName("string");
        candidate.setPhoneNumber("string");
        
        candidate.setId(1L);
        interview.setCandidate(candidate);
        interview.setDayOfInterview(new Date());
        interview.setStatusCandidate(new StatusCandidate(1L, "Challenge"));

        return interview;
    }

    public static User buildLoginTest() {
        User user = new User();
        user.setEmail("elena@softwatrenatura.com");
        user.setName("Elena");
        user.setLastname("Coronel");
        user.setRol("user1");
        
        return user;
    }

    public static Challenge buildChallengeTest() {
        Challenge challenge = new Challenge();
        challenge.setComment("test");
        Candidate candidate = new Candidate();
        
        candidate.setDateOfBirth(new Date());
        candidate.setEmail("string");
        
        candidate.setIdNumber("string");
        candidate.setLastName("string");
        candidate.setName("string");
        candidate.setPhoneNumber("string");
        
        candidate.setId(1L);
        challenge.setCandidate(candidate);
        challenge.setDayOfSent(new Date());
        challenge.setDayOfExpected(new Date());
        challenge.setStatusChallenge (new StatusChallenge(1L, "SENT"));

        return challenge;
    }

    public static User buildUserTest() {
        User user = new User();
        user.setActive(true);
        user.setEmail("alan@gmail.com");
        user.setIdUser(1L);
        user.setLastname("Lopez");
        user.setName("Alan");
        user.setPassword("usaToday1!");
        user.setPhoneNumber("321456");
        user.setRol("user1");
        return user;
    }


    public static <T> String jsonStringFromObject(Object object) {
        String jsonValue = null;
        try {
            mapper.configure(SerializationFeature.WRAP_ROOT_VALUE, false);
            ObjectWriter ow = mapper.writer().withDefaultPrettyPrinter();
            jsonValue = ow.writeValueAsString(object);
        } catch (Exception e) {
            System.err.println("jsonStringFromObject: "+e.getMessage());
        }

        return jsonValue;
    }
}