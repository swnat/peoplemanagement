package com.swnat.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.swnat.dto.Approval;
import com.swnat.dto.InterviewFormRequest;
import com.swnat.dto.InterviewWFDTO;
import com.swnat.model.Candidate;
import com.swnat.model.Interview;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.runtime.Execution;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.form.api.FormDefinition;
import org.flowable.form.api.FormRepositoryService;
import org.flowable.form.engine.FormEngines;
import org.flowable.task.api.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InterviewWorkflowService {
    private static final String INTERVIEW_PROCESS_KEY = "interview-process";
    private static final String IN_PROCESS ="IN PROCESS";
    private static final String COMPLETED ="COMPLETED";

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private InterviewService interviewService;

    @Transactional
    public Interview startProcess(InterviewWFDTO request) {
        Map<String, Object> variables = new HashMap<String, Object>();
        Interview interviewResponse = new Interview();
        String taskId = "";
        //verify if exist instance active
        Optional<ProcessInstance> existsProcessInstance = getProcessInstanceActive(request.getCandidateId());
        //update the status interview by candidate
        candidateService.updateInterviewStatus(request.getCandidateId(), IN_PROCESS);

        if(existsProcessInstance.isPresent()) {
            Execution executionSubProcess = executeSubProcessByProcessInstanceId(existsProcessInstance.get().getId());
            taskId = startTask(executionSubProcess.getId(), existsProcessInstance.get().getId());
        }else{
            variables.put("user_assignee", request.getUserAssignee());
            variables.put("candidate_id", request.getCandidateId());

            ProcessInstance pi = runtimeService.startProcessInstanceByKey(INTERVIEW_PROCESS_KEY, variables);
            
            //execute subprocess
            Execution executionSubProcess = executeSubProcessByProcessInstanceId(pi.getId());
            
            taskId = startTask(executionSubProcess.getId(), pi.getId());
        }

        //add interview
        request.getInterview().setTaskId(taskId);
        if(request.getInterview().getCandidate() == null){
            Candidate candidate = candidateService.getOne(Long.valueOf(request.getCandidateId()));
            request.getInterview().setCandidate(candidate);
        }
        if(InterviewFormRequest.Action.ADD.equals(request.getAction())) {
            interviewResponse = interviewService.add(request.getInterview());
        }else{
            interviewResponse = interviewService.update(request.getInterview().getId(), request.getInterview());
        }
        return interviewResponse;
    }

    private Execution executeSubProcessByProcessInstanceId(String processInstanceId) {
        return runtimeService.createExecutionQuery().activityId("interview").processInstanceId(processInstanceId).singleResult();
    }

    public Optional<ProcessInstance> getProcessInstanceActive(String candidateId) {
        List<ProcessInstance> list = runtimeService.createProcessInstanceQuery().active().
        processDefinitionKey(INTERVIEW_PROCESS_KEY).list();

        Optional<ProcessInstance> existsProcessInstance = list.stream().filter(s -> {
            return candidateId.equals(runtimeService.getVariable(s.getId(), "candidate_id"));
        }).findAny();

        return existsProcessInstance;
    }

    public String startTask(String subProcessExecutionId, String processInstanceId) {
        Task taskActive = taskService.createTaskQuery().active().
        processInstanceId(processInstanceId).singleResult();

        //if is new, create otherwise return the existing task
        if(taskActive != null) {
            return taskActive.getId();
        }else{
            runtimeService.executeActivityInAdhocSubProcess(subProcessExecutionId, "create-interview");
            Task subProcessTask = taskService.createTaskQuery().active().
            processInstanceId(processInstanceId).taskDefinitionKey("create-interview").singleResult();

            return subProcessTask.getId();
        }
    }

    @Transactional
    public void completeTaskForm(InterviewFormRequest interview) {
        Map<String, Object> variables = new HashMap<String, Object>();

        Task task = taskService.createTaskQuery().taskId(interview.getTaskId()).singleResult();

        variables.put("action", interview.getAction().name());
        variables.put("user_assignee", interview.getUserAssignee());
        variables.put("candidate_id", interview.getCandidateId());

        Map<String, Object> participants = new HashMap<>();
        participants.put("id", interview.getParticipants());
    
        variables.put("dayoftheinterview", convertToLocalDateViaInstant(interview.getDayOfInterview()).toString());
        variables.put("comment", interview.getComment());
        variables.put("participants", participants);
        variables.put("type_interview", interview.getStatusCandidate().getName());

        //get form definition
        FormRepositoryService formRepositoryService = FormEngines.getDefaultFormEngine().getFormRepositoryService();
        FormDefinition formDefinition = formRepositoryService.createFormDefinitionQuery().formDefinitionKey("create-interview-form").singleResult();
        
        if(interview.getAction() != null) 
            taskService.addComment(task.getId(), task.getProcessInstanceId(), interview.getAction().name());

        taskService.completeTaskWithForm(task.getId(), formDefinition.getId(), null, variables);
    }

    public LocalDate convertToLocalDateViaInstant(Date dateToConvert) {
        return dateToConvert.toInstant()
          .atZone(ZoneId.systemDefault())
          .toLocalDate();
    }

    @Transactional
    public Boolean completeProcess(Approval approval) {
        Map<String, Object> variables = new HashMap<String, Object>();
        Optional<ProcessInstance> processInstance = getProcessInstanceActive(approval.getCandidateId());

        if(processInstance.isPresent()) {
            Execution execution = 
            runtimeService.getAdhocSubProcessExecutions(processInstance.get().getId()).get(0);//createExecutionQuery(). activityId("interview").list();
            runtimeService.completeAdhocSubProcess(execution.getId());
            //update interview status
            candidateService.updateInterviewStatus(approval.getCandidateId(), COMPLETED);

            return true;
        }else{
            return false;
        }
    }
}