package com.swnat.processes;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.flowable.bpmn.model.FlowNode;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.runtime.Execution;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.engine.test.Deployment;
import org.flowable.spring.impl.test.FlowableSpringExtension;
import org.flowable.task.api.Task;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@ExtendWith(FlowableSpringExtension.class)
@SpringBootTest
public class InterviewWorkflowIntegrationTest {

    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private TaskService taskService;

    @Test
    @Deployment(resources = "processes/interview-process.bpmn20.xml")
    public void interviewIntegrationTest() {
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("interview-process");
        Execution execution = runtimeService.createExecutionQuery().activityId("interview").processInstanceId(pi.getId()).singleResult();
        assertNotNull(execution);

        List<FlowNode> enabledActivities = runtimeService.getEnabledActivitiesFromAdhocSubProcess(execution.getId());
        assertEquals(1, enabledActivities.size());

        Execution newTaskExecution = runtimeService.executeActivityInAdhocSubProcess(execution.getId(), "create-interview");
        assertNotNull(newTaskExecution);
        assertNotNull(newTaskExecution.getId());

        Task subProcessTask = taskService.createTaskQuery().processInstanceId(pi.getId()).taskDefinitionKey("create-interview").singleResult();
        assertEquals("Create Interview", subProcessTask.getName());

        taskService.complete(subProcessTask.getId());

        enabledActivities = runtimeService.getEnabledActivitiesFromAdhocSubProcess(execution.getId());
        assertEquals(1, enabledActivities.size());

        runtimeService.completeAdhocSubProcess(execution.getId());
        assertNull(runtimeService.createProcessInstanceQuery().processInstanceId(pi.getId()).singleResult());
    }
}