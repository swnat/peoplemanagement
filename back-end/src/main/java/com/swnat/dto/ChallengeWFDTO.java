package com.swnat.dto;

import com.swnat.dto.ChallengeFormRequest.Action;
import com.swnat.model.Challenge;

public class ChallengeWFDTO {
    private String userAssignee;
    private String candidateId;
    private Challenge challenge;
    private Action action;

    public String getUserAssignee() {
        return userAssignee;
    }

    public void setUserAssignee(String userAssignee) {
        this.userAssignee = userAssignee;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setChallenge(Challenge challenge) {
        this.challenge = challenge;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }
}