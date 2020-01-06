package com.swnat.dto;

import java.util.Date;
import com.swnat.model.StatusChallenge;

public class ChallengeFormRequest{
    private String comment;
    private Date dayOfSent;
    private Date dayOfExpected;
    private String reviewer;
    private StatusChallenge statusChallenge;
    private String linkChallenge;
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

    public Date getDayOfSent() {
        return dayOfSent;
    }

    public void setDayOfSent(Date dayOfSent) {
        this.dayOfSent = dayOfSent;
    }

    public Date getDayOfExpected() {
        return dayOfExpected;
    }

    public void setDayOfExpected(Date dayOfExpected) {
        this.dayOfExpected = dayOfExpected;
    }

    public String getReviewer() {
        return reviewer;
    }

    public void setReviewer(String reviewer) {
        this.reviewer = reviewer;
    }

    public StatusChallenge getStatusChallenge() {
        return statusChallenge;
    }

    public void setStatusChallenge(StatusChallenge statusChallenge) {
        this.statusChallenge = statusChallenge;
    }

    public String getLinkChallenge() {
        return linkChallenge;
    }

    public void setLinkChallenge(String linkChallenge) {
        this.linkChallenge = linkChallenge;
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