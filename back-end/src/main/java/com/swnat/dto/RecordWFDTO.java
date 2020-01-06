package com.swnat.dto;

import java.io.Serializable;
import java.util.Map;

public class RecordWFDTO  implements Serializable {
    private static final long serialVersionUID = 5881806636583130071L;
    private String candidateName;
	private String timeStampString;
	private String userName;
    private String process;
    private String action;
    
    private Map<String,String>details;
    public RecordWFDTO() {
    }

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getTimeStampString() {
        return timeStampString;
    }

    public void setTimeStampString(String timeStampString) {
        this.timeStampString = timeStampString;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public Map<String, String> getDetails() {
        return details;
    }

    public void setDetails(Map<String, String> details) {
        this.details = details;
    }

}
