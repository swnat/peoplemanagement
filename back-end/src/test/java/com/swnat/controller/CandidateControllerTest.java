package com.swnat.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

import com.swnat.TestUtils;
import com.swnat.model.Candidate;
import com.swnat.model.Challenge;
import com.swnat.service.CandidateService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class) // provide the spring context for the test
@SpringBootTest
@AutoConfigureMockMvc//provide configuration for the MockMvc
public class CandidateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CandidateService candidateService;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getAllCandidateTest() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(TestUtils.CANDIDATE_URL).
        param("filter", "S").param("page", "0").param("size", "100").param("sortby", "last modified").
        contentType(MediaType.APPLICATION_JSON_UTF8).accept(MediaType.APPLICATION_JSON_UTF8)).
        andReturn();

        // verify status post call
        int status = result.getResponse().getStatus();
        assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
    }
    
    public void saveCandidateTest() throws Exception {
    	
    	 // prepare data and mock's behaviour
        Candidate candidate = TestUtils.buildCandidateTest();
        when(candidateService.add(any(Candidate.class))).
        thenReturn(candidate);

        String requestJson= TestUtils.jsonStringFromObject(candidate);

        // execute
         MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(TestUtils.CANDIDATE_URL).
         contentType(MediaType.APPLICATION_JSON_UTF8).
         accept(MediaType.APPLICATION_JSON_UTF8).
         content(requestJson)).andReturn();


        // verify status post call
        int status = result.getResponse().getStatus();
        assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
                
        // verify that service method was called once
        verify(candidateService).add(any(Candidate.class));
    }
    
    @Test
    public void updateCandidateTest() throws Exception {
    	
   	 // prepare data and mock's behaviour
       Candidate candidate = TestUtils.buildCandidateTest();
       when(candidateService.add(any(Candidate.class))).
       thenReturn(candidate);

       String requestJson= TestUtils.jsonStringFromObject(candidate);

       // execute
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(TestUtils.CANDIDATE_URL+"{id}", candidate.getId()).
        contentType(MediaType.APPLICATION_JSON_UTF8).
        accept(MediaType.APPLICATION_JSON_UTF8).
        content(requestJson)).andReturn();


       // verify status post call
       int status = result.getResponse().getStatus();
       // assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
   }
   
    
   
}