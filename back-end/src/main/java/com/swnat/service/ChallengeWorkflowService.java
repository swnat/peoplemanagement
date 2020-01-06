package com.swnat.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.swnat.dto.Approval;
import com.swnat.dto.ChallengeFormRequest;
import com.swnat.dto.ChallengeWFDTO;
import com.swnat.model.Candidate;
import com.swnat.model.Challenge;

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
public class ChallengeWorkflowService {
    private static final String CHALLENGE_PROCESS_KEY = "challenge-process";
    private static final String IN_PROCESS = "IN PROCESS";
    private static final String COMPLETED = "COMPLETED";

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private ChallengeService challengeService;

    @Transactional
    public Challenge startProcess(ChallengeWFDTO request) {
        Map<String, Object> variables = new HashMap<String, Object>();
        Challenge challengeResponse = new Challenge();
        String taskId = "";
        // verify if exist instance active
        Optional<ProcessInstance> existsProcessInstance = getProcessInstanceActive(request.getCandidateId());
        // update the status challenge by candidate
        candidateService.updateChallengeStatus(request.getCandidateId(), IN_PROCESS);

        if (existsProcessInstance.isPresent()) {
            Execution executionSubProcess = executeSubProcessByProcessInstanceId(existsProcessInstance.get().getId());
            taskId = startTask(executionSubProcess.getId(), existsProcessInstance.get().getId());
        } else {
            variables.put("user_assignee", request.getUserAssignee());
            variables.put("candidate_id", request.getCandidateId());

            ProcessInstance pi = runtimeService.startProcessInstanceByKey(CHALLENGE_PROCESS_KEY, variables);
            // execute subprocess
            Execution executionSubProcess = executeSubProcessByProcessInstanceId(pi.getId());

            taskId = startTask(executionSubProcess.getId(), pi.getId());
        }

        // add challenge
        request.getChallenge().setTaskId(taskId);
        if(request.getChallenge().getCandidate() == null){
            Candidate candidate = candidateService.getOne(Long.valueOf(request.getCandidateId()));
            request.getChallenge().setCandidate(candidate);
        }

        
        if (ChallengeFormRequest.Action.ADD.equals(request.getAction())) {
            challengeResponse = challengeService.add(request.getChallenge());
        } else {
            challengeResponse = challengeService.update(request.getChallenge().getId(), request.getChallenge());
        }
        return challengeResponse;
    }

    private Execution executeSubProcessByProcessInstanceId(String processInstanceId) {
        return runtimeService.createExecutionQuery().activityId("challenge").processInstanceId(processInstanceId).singleResult();
    }

    public Optional<ProcessInstance> getProcessInstanceActive(String candidateId) {
        List<ProcessInstance> list = runtimeService.createProcessInstanceQuery().active()
                .processDefinitionKey(CHALLENGE_PROCESS_KEY).list();

        Optional<ProcessInstance> existsProcessInstance = list.stream().filter(s -> {
            return candidateId.equals(runtimeService.getVariable(s.getId(), "candidate_id"));
        }).findAny();

        return existsProcessInstance;
    }

    public String startTask(String subProcessExecutionId, String processInstanceId) {
        Task taskActive = taskService.createTaskQuery().active().processInstanceId(processInstanceId).singleResult();

        // if is new, create otherwise return the existing task
        if (taskActive != null) {
            return taskActive.getId();
        } else {
            runtimeService.executeActivityInAdhocSubProcess(subProcessExecutionId, "create-challenge");
            Task subProcessTask = taskService.createTaskQuery().active().
            processInstanceId(processInstanceId).taskDefinitionKey("create-challenge").singleResult();

            return subProcessTask.getId();
        }
    }

    @Transactional
    public void completeTaskForm(ChallengeFormRequest challenge) {
        Map<String, Object> variables = new HashMap<String, Object>();

        Task task = taskService.createTaskQuery().taskId(challenge.getTaskId()).singleResult();

        variables.put("action", challenge.getAction().name());
        variables.put("user_assignee", challenge.getUserAssignee());
        variables.put("candidate_id", challenge.getCandidateId());

        variables.put("dayofsent", convertToLocalDateViaInstant(challenge.getDayOfSent()).toString());
        variables.put("dayofexpected", convertToLocalDateViaInstant(challenge.getDayOfExpected()).toString());
        variables.put("comment", challenge.getComment());
        variables.put("reviewer", challenge.getReviewer());
        variables.put("linkchallenge", challenge.getLinkChallenge());
        variables.put("statuschallenge",challenge.getStatusChallenge().getName());
        // get form definition
        FormRepositoryService formRepositoryService = FormEngines.getDefaultFormEngine().getFormRepositoryService();
        FormDefinition formDefinition = formRepositoryService.createFormDefinitionQuery().formDefinitionKey("create-challenge-form").singleResult();

        
        if (challenge.getAction() != null)
            taskService.addComment(task.getId(), task.getProcessInstanceId(), challenge.getAction().name());

        taskService.completeTaskWithForm(task.getId(), formDefinition.getId(), null, variables);
    }

    public LocalDate convertToLocalDateViaInstant(Date dateToConvert) {

        return dateToConvert.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    }

    @Transactional
    public Boolean completeProcess(Approval approval) {
        Map<String, Object> variables = new HashMap<String, Object>();
        Optional<ProcessInstance> processInstance = getProcessInstanceActive(approval.getCandidateId());

        if (processInstance.isPresent()) {
            Execution execution = runtimeService.getAdhocSubProcessExecutions(processInstance.get().getId()).get(0);// createExecutionQuery().activityId("challenge").list();
            runtimeService.completeAdhocSubProcess(execution.getId());
            // update challenge status
            candidateService.updateChallengeStatus(approval.getCandidateId(), COMPLETED);

            return true;
        } else {
            return false;
        }
    }
}