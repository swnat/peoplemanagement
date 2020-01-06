package com.swnat.service;

import java.util.Optional;
import java.util.Set;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.engine.task.Comment;

import com.swnat.dto.PaginationResponse;
import com.swnat.dto.RecordWFDTO;
import com.swnat.repository.CandidateRepository;
import com.swnat.model.Candidate;

@Service
public class RecordService {
    private static final String INTERVIEW_PROCESS_KEY = "interview-process";
    private static final String CHALLENGE_PROCESS_KEY = "challenge-process";

    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private TaskService taskService;
    @Autowired
    private RuntimeService runtimeService;

    public PaginationResponse<RecordWFDTO> find(int page, int size) {
    //public List<RecordWFDTO> getRecordList() {
        Set<String> hash_Set = new HashSet<String>();
        hash_Set.add(INTERVIEW_PROCESS_KEY);
        hash_Set.add(CHALLENGE_PROCESS_KEY);

        List<RecordWFDTO> recordList = new ArrayList<RecordWFDTO>();
        long count = runtimeService.createProcessInstanceQuery().processDefinitionKeys(hash_Set).includeProcessVariables().count();
        List<ProcessInstance> processList = runtimeService.createProcessInstanceQuery().processDefinitionKeys(hash_Set).includeProcessVariables().listPage(page*size, size);
        for(ProcessInstance processInstance:processList){
            RecordWFDTO recordWFDTO = new RecordWFDTO();

            Long candidate_id = Long.valueOf(processInstance.getProcessVariables().get("candidate_id").toString());
            Candidate candidate =  candidateRepository.getOne(candidate_id);
            recordWFDTO.setCandidateName(candidate.getName() +" "+candidate.getLastName());
            if(processInstance.getProcessDefinitionKey().equals(this.INTERVIEW_PROCESS_KEY)){
                recordWFDTO.setProcess(processInstance.getProcessVariables().get("type_interview").toString());
            } else if(processInstance.getProcessDefinitionKey().equals(this.CHALLENGE_PROCESS_KEY)){
                recordWFDTO.setProcess("Challenge");
            }

            recordWFDTO.setUserName(processInstance.getProcessVariables().get("user_assignee").toString());

            /*ADD ACTION*/
            List<Comment> commentsByType = taskService.getProcessInstanceComments(processInstance.getId(), "comment");
            if(commentsByType.size() > 0)
                recordWFDTO.setAction(commentsByType.get(0).getFullMessage());  

            /*ADD TIMESTAMP*/
            String pattern = "yyyy-MM-dd / HH:mm";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String date = simpleDateFormat.format(processInstance.getStartTime());
            recordWFDTO.setTimeStampString(date);

            /*ADD DETAILS*/
            Map<String, String> details = new HashMap<String,String>();
            if(processInstance.getProcessDefinitionKey().equals(this.INTERVIEW_PROCESS_KEY)){
                details.put("Comment", processInstance.getProcessVariables().get("comment").toString());
                details.put("Day of Interview", processInstance.getProcessVariables().get("dayoftheinterview").toString());
                /*ADD PARTICIPANTS TO DETAILS*/
                String participants = (String) processInstance.getProcessVariables().get("participants");
                participants = participants.replace("[", "").replace("]", "");
                details.put("Participants", participants);
            } else if(processInstance.getProcessDefinitionKey().equals(this.CHALLENGE_PROCESS_KEY)){
                details.put("Day Sent", processInstance.getProcessVariables().get("dayofsent").toString());
                details.put("Day Expected", processInstance.getProcessVariables().get("dayofexpected").toString());
                details.put("Reviewer", processInstance.getProcessVariables().get("reviewer").toString());
                details.put("Link Challenge", processInstance.getProcessVariables().get("linkchallenge").toString());
                details.put("Status Challenge", processInstance.getProcessVariables().get("statuschallenge").toString());
                details.put("Comment", processInstance.getProcessVariables().get("comment").toString());
            }

            recordWFDTO.setDetails(details);    
            
            recordList.add(recordWFDTO);
        }
        PaginationResponse<RecordWFDTO> response = new PaginationResponse<>();
        response.setContent(recordList);
        response.setTotalCount(count);
        return response;
    }

}