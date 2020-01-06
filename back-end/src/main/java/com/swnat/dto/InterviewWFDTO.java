package com.swnat.dto;

import com.swnat.dto.InterviewFormRequest.Action;
import com.swnat.model.Interview;

public class InterviewWFDTO {
    private String userAssignee;
	private String candidateId;
	private Interview interview;
	private Action action;


	public String getUserAssignee() {
		return userAssignee;
	}
	public void setUserAssignee(String assignee) {
		this.userAssignee = assignee;
	}
	public String getCandidateId() {
		return candidateId;
	}
	public void setCandidateId(String candidateId) {
		this.candidateId = candidateId;
	}

	public Interview getInterview() {
		return interview;
	}

	public void setInterview(Interview interview) {
		this.interview = interview;
	}

	public Action getAction() {
		return action;
	}

	public void setAction(Action action) {
		this.action = action;
	}
    
}