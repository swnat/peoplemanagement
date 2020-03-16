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
    public Candidate saveCandidate(@RequestParam("candidate") String candidateForm, @RequestParam(value = "imageProfile", required = false) MultipartFile image) throws JsonParseException, JsonMappingException, IOException {
        Candidate candidate = new ObjectMapper().readValue(candidateForm, Candidate.class);
        if ( image != null){
            candidate.setProfileImage(uploadImage(image));
        }
        return candidateService.add(candidate);
    }

    @ApiOperation(value = "Edit a candidate", notes = "Update data of an existing candidate.")
    @PutMapping("/{id}")
    public Candidate updateCandidate(@RequestParam("candidate") String candidateForm, @RequestParam(value= "imageProfile", required = false) MultipartFile image, @PathVariable Long id, 
    @RequestParam(value = "active") String active) throws JsonParseException, JsonMappingException, IOException {
        Candidate candidate = new ObjectMapper().readValue(candidateForm, Candidate.class);

        if ( image == null && candidate.getProfileImage() != null && active.equals("false") ){
            removeImage(candidate.getProfileImage());
            candidate.setProfileImage(null);
        }
        else if ( image != null &&  candidate.getProfileImage() == null ){
            candidate.setProfileImage(uploadImage(image));
        }
        else if ( image != null && candidate.getProfileImage() != null ) {
            removeImage(candidate.getProfileImage());
            candidate.setProfileImage(uploadImage(image));
        }
        
        return candidateService.update(id, candidate);
    }

    @ApiOperation(value = "Get an candidate", notes = "Get an candidate by id.")
    @GetMapping("/{id}")
    public Candidate getCandidate(@PathVariable Long id) {
        return candidateService.getOne(id);
    }

    public String uploadImage(MultipartFile image) throws IOException {
        String directory = System.getProperty("user.dir") + File.separator + "src" 
        + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator 
        + "swnat" + File.separator + "profile_images";
        Path mypath = Paths.get(directory);
        if ( !Files.exists(mypath) ){
            Files.createDirectory(mypath);
            System.out.println("Directory created");
        }
        
        StringBuilder builder = new StringBuilder();
        builder.append(directory);
        builder.append(File.separator);
        builder.append(image.getOriginalFilename());

        byte [] filebytes = image.getBytes();
        Path path = Paths.get(builder.toString());
        Files.write(path, filebytes);

        return "http://localhost:8080/api/v1/uploads/" + image.getOriginalFilename();
    }    

    public void removeImage(String urlImage){
        String nameImage = urlImage.substring(37);
        System.out.println(nameImage);
        String pathImage = System.getProperty("user.dir") + File.separator + "src" 
        + File.separator + "main" + File.separator + "java" + File.separator + "com" + File.separator 
        + "swnat" + File.separator + "profile_images" + File.separator + nameImage;

        File fileImage = new File(pathImage);
        if ( !fileImage.exists()){
            System.out.println("Image name does not exist");
        }
        else{
            fileImage.delete();
            System.out.println("Successfully deleted image server");
        }
    }
}
