package com.swnat.dto;

public class Approval {
    private String taskId;
    private String userAssignee;
    private String candidateId;
    private String description;

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}