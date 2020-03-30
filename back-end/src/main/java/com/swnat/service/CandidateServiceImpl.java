package com.swnat.service;

import java.util.List;
import java.util.stream.Collectors;

import com.swnat.dto.PaginationResponse;
import com.swnat.model.Candidate;
import com.swnat.repository.CandidateRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;
import java.nio.file.Files;


@Service
@Transactional
public class CandidateServiceImpl extends GenericService<Candidate, Long> implements CandidateService {
    private static final String IN_PROCESS ="IN PROCESS";
    private static final String COMPLETED ="COMPLETED";
    private static final String PENDING ="PENDING";
    private static final String fileUrl = File.separator + "src" + 
                    File.separator + "main" + 
                    File.separator + "resources" + 
                    File.separator + "generic_files";

    private CandidateRepository candidateRepository;

    public CandidateServiceImpl(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    @Override
    public JpaRepository<Candidate, Long> getRepository() {
        return this.candidateRepository;
    }

    @Override
    public Candidate getOne(Long id) {
        Candidate candidate = candidateRepository.getOne(id);
        candidate.setNameCandidate(candidate.getName() +" "+candidate.getLastName());
        return candidate;
    }

    @Override
    public PaginationResponse<Candidate> findByFilter(String filter, int page, int size, String sortBy) {
        Page<Candidate> searchResult;

        Sort sortByQuery = Sort.by(Sort.Direction.DESC, "modifiedTimestamp"); // default LAST_MODIFIED
        if (sortBy.equals("LAST_NAME")) {
            sortByQuery = Sort.by(Sort.Direction.ASC, "lastName");
        }
        PageRequest pageRequest = PageRequest.of(page, size, sortByQuery);

        if (filter == null || filter.isEmpty()) {
            searchResult = candidateRepository.findAll(pageRequest);
        } else {
            searchResult = candidateRepository.findAllByNameContainsOrLastNameContains(filter.toUpperCase(), filter, pageRequest);
        }

        // List<Candidate> candidates = searchResult.getContent().stream().sorted(Comparator.comparing(Candidate::getLastName)).collect(Collectors.toList());//order by last name
        List<Candidate> candidates = searchResult.getContent().stream().collect(Collectors.toList());
        candidates.forEach(c->  c.setNameCandidate(c.getName() +" "+c.getLastName()));//set name and lastName for candidate

        PaginationResponse<Candidate> response = new PaginationResponse<>();
        response.setContent(candidates);
        response.setTotalCount(searchResult.getTotalElements());
        return response;
    }

    @Override
    public void updateInterviewStatus(String candidateId, String interviewStatus){
        Long candidateIdLong = new Long(candidateId);
        Candidate candidate = getOne(candidateIdLong);
        //update finish process of the interviews
        if(COMPLETED.equals(interviewStatus)) {
            candidate.getInterviews().stream().forEach(i -> i.setFinishProcess(true));
            candidate.setInterviewStatus(COMPLETED);
        }else if(PENDING.equals(interviewStatus) && candidate.getInterviews().size() == 0) {
            candidate.setInterviewStatus(PENDING);
        }else{
            candidate.setInterviewStatus(IN_PROCESS);
        }

        //update interview status
        update(candidateIdLong, candidate);
    }

    @Override
    public void updateChallengeStatus(String candidateId, String challengeStatus){
        
        Long candidateIdLong = new Long(candidateId);
        Candidate candidate = getOne(candidateIdLong);
        //update finish process of the interviews
        if(COMPLETED.equals(challengeStatus)) {
            candidate.getChallenge().stream().forEach(i -> i.setFinishProcess(true));
            candidate.setProcess_challenge_status(COMPLETED);
        }else if(PENDING.equals(challengeStatus) ) {
            candidate.setProcess_challenge_status(PENDING);
        }else{
            candidate.setProcess_challenge_status(IN_PROCESS);
        }

        //update interview status
        update(candidateIdLong, candidate);
        
    }

    public String uploadFile(MultipartFile file) {
        String directory = System.getProperty("user.dir") + fileUrl;
        Path mypath = Paths.get(directory);

        if ( !Files.exists(mypath) ){
            try {
                Files.createDirectory(mypath);
                System.out.println("Directory created");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        //Formatting the file names to be unique by adding date and time
        Calendar cal = Calendar.getInstance();
        cal.setTime(Date.from(Instant.now()));
        //create filename from a format string
        String name = String.format("file-%1$tY-%1$tm-%1$td-%1$tk-%1$tS-%1$tp-" + file.getOriginalFilename(), cal);
        
        StringBuilder builder = new StringBuilder();
        builder.append(directory);
        builder.append(File.separator);
        builder.append(name);
   
        try {
            byte[] filebytes;
            filebytes = file.getBytes();
            Path path = Paths.get(builder.toString());
            Files.write(path, filebytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return name;
    }    

    public void removeFile(String name){
        String directory = System.getProperty("user.dir")  + fileUrl + File.separator + name;
        File filePath = new File(directory);
        if ( !filePath.exists()){
            System.out.println("Image name does not exist");
        }
        else{
            filePath.delete();
            System.out.println("Successfully deleted image server");
        }
    }  
}