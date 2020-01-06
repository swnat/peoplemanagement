package com.swnat.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
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
@Table(name = "challenge", schema = "management")
public class Challenge implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "comment")
    private String comment;

    @Column(name = "task_id")
    private String taskId;

    @Column(name = "day_of_sent")
    private Date dayOfSent;


    @Column(name = "day_of_expected")
    private Date dayOfExpected;

    @Column(name = "reviewer")
    private String reviewer;

    @Column(name = "link_challenge")
    private String linkChallenge;


    @Column(name = "finish_process")
    private boolean isFinishProcess;

    @OneToOne
    @JoinColumn(name = "status_challenge_id", referencedColumnName = "id")
    private StatusChallenge statusChallenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", referencedColumnName = "id")
    private Candidate candidate;


    public Challenge() {}

    public Challenge(Long id, String comment, String reviewer, String link_challenge, Date day_of_sent, Date day_of_expected, StatusChallenge status_challenge, Candidate candidate ) {
        this.id =id;
        this.comment=comment;
        this.reviewer=reviewer;
        this.dayOfSent = day_of_sent;
        this.dayOfExpected = day_of_expected;
        this.statusChallenge = status_challenge;
        this.linkChallenge = link_challenge;
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

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
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

    public boolean isFinishProcess() {
        return isFinishProcess;
    }

    public void setFinishProcess(boolean isFinishProcess) {
        this.isFinishProcess = isFinishProcess;
    }

    public StatusChallenge getStatusChallenge() {
        return statusChallenge;
    }

    public void setStatusChallenge(StatusChallenge statusChallenge) {
        this.statusChallenge = statusChallenge;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }

    public String getLinkChallenge() {
        return linkChallenge;
    }

    public void setLinkChallenge(String linkChallenge) {
        this.linkChallenge = linkChallenge;
    }

    

}