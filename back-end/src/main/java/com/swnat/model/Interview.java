package com.swnat.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "interview", schema = "management")
public class Interview implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "task_id")
    private String taskId;

    @Column(name = "day_of_interview")
    private Date dayOfInterview;

    @Column(name = "finish_process")
    private boolean isFinishProcess;

    @ElementCollection
    @CollectionTable(schema = "management", name = "interview_participants")
    @Column(name = "participant")
    //private List<String> participants;
    private Set<String> participants = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "status_candidate_id", referencedColumnName = "id")
    private StatusCandidate statusCandidate;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", referencedColumnName = "id")
    private Candidate candidate;


    public Interview() {}

    public Interview(Long id, String comment, Date day_of_interview, StatusCandidate status_candidate, Candidate candidate ) {
        this.id =id;
        this.comment=comment;
        this.dayOfInterview = day_of_interview;
        this.statusCandidate = status_candidate;
        this.candidate = candidate;      
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public StatusCandidate getStatusCandidate() {
        return statusCandidate;
    }

    public void setStatusCandidate(StatusCandidate statusCandidate) {
        this.statusCandidate = statusCandidate;
    }
    
    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public Set<String> getParticipants() {
        return participants;
    }

    public void setParticipants(Set<String> participants) {
        this.participants = participants;
    }

    public boolean isFinishProcess() {
        return isFinishProcess;
    }

    public void setFinishProcess(boolean isFinishProcess) {
        this.isFinishProcess = isFinishProcess;
    }
    public Candidate getCandidate() {
        return this.candidate;
    }

}