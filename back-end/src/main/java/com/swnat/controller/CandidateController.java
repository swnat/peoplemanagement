package com.swnat.controller;


import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swnat.dto.PaginationResponse;
import com.swnat.model.Candidate;
import com.swnat.service.CandidateService;
import io.swagger.annotations.ApiOperation;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;

import javax.validation.Valid;

import java.nio.file.Files;

@RestController
@RequestMapping("/api/v1/candidates")
public class CandidateController {

    private CandidateService candidateService;

    public CandidateController(CandidateService candidateService) {
        this.candidateService = candidateService;
    }

    @ApiOperation(value = "Get list of candidates", notes = "Get list of candidates by filtering with a text and returning paginated and sort by")
    @GetMapping("/")
    public PaginationResponse<Candidate> getAllCandidate(
            @RequestParam(value = "filter", required = false) String filter, @RequestParam("page") int page,
            @RequestParam("size") int size, @RequestParam("sortby") String sortBy) {
        return candidateService.findByFilter(filter, page, size, sortBy);
    }

    @ApiOperation(value = "Create a candidate", notes = "Create a new candidate.")
    @PostMapping("/")
    public Candidate saveCandidate(@RequestParam("candidate") String candidateJson, @RequestParam(value = "imagefile", required = false) MultipartFile image, 
    @RequestParam(value = "resumeUrl", required = false) MultipartFile resume, @RequestParam(value = "fileUrl", required = false) MultipartFile file) throws JsonParseException, JsonMappingException, IOException {
        Candidate candidate = new ObjectMapper().readValue(candidateJson, Candidate.class);
        candidate.setProfileImage( (image != null) ? uploadFile(image) : null );
        candidate.setResumeUrl( (resume != null) ? uploadFile(resume) : null );
        candidate.setFileUrl( (file != null) ? uploadFile(file) : null );

        return candidateService.add(candidate);
    }

    @ApiOperation(value = "Edit a candidate", notes = "Update data of an existing candidate.")
    @PutMapping("/{id}")
    public Candidate updateCandidate(@RequestParam("candidate") String candidateJson, @RequestParam(value = "imagefile", required = false) MultipartFile image, 
    @RequestParam(value = "resumeUrl", required = false) MultipartFile resume, @RequestParam(value = "fileUrl", required = false) MultipartFile file , @PathVariable Long id,
    @RequestParam("active") String activeJson) throws IOException {

        Candidate candidate = new ObjectMapper().readValue(candidateJson, Candidate.class);
        Boolean active = new ObjectMapper().readValue(activeJson, Boolean.class);
       
        if ( image == null && candidate.getProfileImage() != null && active == false ){
            removeFile(candidate.getProfileImage());
            candidate.setProfileImage(null);
        }
        else if ( image != null &&  candidate.getProfileImage() == null ){
            candidate.setProfileImage(uploadFile(image));
        }
        else if ( image != null && candidate.getProfileImage() != null ) {
            removeFile(candidate.getProfileImage());
            candidate.setProfileImage(uploadFile(image));
        }

        if ( resume != null && candidate.getResumeUrl() != null  ) { removeFile(candidate.getResumeUrl()); candidate.setResumeUrl(uploadFile(resume)); }
        else { candidate.setResumeUrl(uploadFile(resume)); }

        if ( file != null && candidate.getFilesUrl() != null  ) { removeFile(candidate.getFilesUrl()); candidate.setFileUrl(uploadFile(file)); }
        else { candidate.setFileUrl(uploadFile(file)); }

        
        return candidateService.update(id, candidate);
    }

    @ApiOperation(value = "Get an candidate", notes = "Get an candidate by id.")
    @GetMapping("/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidateService.getOne(id);
    }

    public String uploadFile(MultipartFile file) throws IOException {

        String directory = System.getProperty("user.dir") + File.separator + "src" 
        + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator 
        + "swnat" + File.separator + "generic_files";
        Path mypath = Paths.get(directory);
        if ( !Files.exists(mypath) ){
            Files.createDirectory(mypath);
            System.out.println("Directory created");
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

        byte [] filebytes = file.getBytes();
        Path path = Paths.get(builder.toString());
        Files.write(path, filebytes);

        return name;
    }    

    public void removeFile(String urlFile){
        String pathImage = System.getProperty("user.dir") + File.separator + "src" 
        + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator 
        + "swnat" + File.separator + "generic_files" + File.separator + urlFile;

        File fileImage = new File(pathImage);
        if ( !fileImage.exists()){
            System.out.println("Image name does not exist");
        }
        else{
            fileImage.delete();
            System.out.println("Successfully deleted image server");
        }
    }

    public String filePath(MultipartFile url, String valUrl){
        
        if ( url == null ){
            return null;
        }
        else {
            if 
        }
    }
}