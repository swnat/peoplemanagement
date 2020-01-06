package com.swnat.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.swnat.model.StatusCandidate;

public class InterviewFormRequest {
    private String comment;

    private Date dayOfInterview;

    // private List<String> participants;
    private Set<String> participants = new HashSet<>();

    private StatusCandidate statusCandidate;

    private Action action;

    private String candidateId;
    private String userAssignee;

    private String taskId;

    public enum Action {ADD, EDIT}

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getDayOfInterview() {
        return dayOfInterview;
    }

    public void setDayOfInterview(Date dayOfInterview) {
        this.dayOfInterview = dayOfInterview;
    }

    public Set<String> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<String> participants) {
        this.participants = participants;
    }

    public StatusCandidate getStatusCandidate() {
        return statusCandidate;
    }

    public void setStatusCandidate(StatusCandidate statusCandidate) {
        this.statusCandidate = statusCandidate;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getUserAssignee() {
        return userAssignee;
    }

    public void setUserAssignee(String userAssignee) {
        this.userAssignee = userAssignee;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}