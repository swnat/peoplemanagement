package com.swnat.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "candidate", schema = "management")
public class Candidate implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "id_number")
    private String idNumber;

    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Column(name = "resume_drive")
    private String resumeDrive;

    @Column(name = "resume_drive_elumen")
    private String resumeDriveElumen;    

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private Integer age;

    @Column(name = "university")
    private String university;

    @Column(name = "interview_status")
    private String interviewStatus;

    @Column(name = "status_elumen")
    private String statusByElumen;

    @Column(name = "comment_elumen")
    private String commentByElumen;

    @Column(name = "process_challenge_status")
    private String process_challenge_status;

    @Transient
    private String nameCandidate;

    @OneToMany(cascade = CascadeType.ALL, 
            fetch = FetchType.LAZY, 
            mappedBy = "candidate")
    @JsonIgnoreProperties("candidate")       
    private List<Interview> interviews;

    @OneToMany(cascade = CascadeType.ALL, 
            fetch = FetchType.LAZY, 
            mappedBy = "candidate")
    @JsonIgnoreProperties("candidate")
    private List<Challenge> challenge;

    public Candidate() {}

    public Candidate(String name, String lastName, String idNumber) {
        this.name = name;
        this.lastName = lastName;
        this.idNumber = idNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getResumeDrive() {
        return resumeDrive;
    }

    public void setResumeDrive(String resumeDrive) {
        this.resumeDrive = resumeDrive;
    }

    public String getResumeDriveElumen() {
        return resumeDriveElumen;
    }

    public void setResumeDriveElumen(String resumeDriveElumen) {
        this.resumeDriveElumen = resumeDriveElumen;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getInterviewStatus() {
        return interviewStatus;
    }

    public void setInterviewStatus(String interviewStatus) {
        this.interviewStatus = interviewStatus;
    }

    public String getStatusByElumen() {
        return statusByElumen;
    }

    public void setStatusByElumen(String statusByElumen) {
        this.statusByElumen = statusByElumen;
    }

    public String getCommentByElumen() {
        return commentByElumen;
    }

    public void setCommentByElumen(String commentByElumen) {
        this.commentByElumen = commentByElumen;
    }

    public String getProcess_challenge_status() {
        return process_challenge_status;
    }

    public void setProcess_challenge_status(String process_challenge_status) {
        this.process_challenge_status = process_challenge_status;
    }

    public String getNameCandidate() {
        return nameCandidate;
    }

    public void setNameCandidate(String nameCandidate) {
        this.nameCandidate = nameCandidate;
    }

    public List<Interview> getInterviews() {
        return interviews;
    }

    public void setInterviews(List<Interview> interviews) {
        this.interviews = interviews;
    }

    public List<Challenge> getChallenge() {
        return challenge;
    }

    public void setChallenge(List<Challenge> challenge) {
        this.challenge = challenge;
    }

    

}
