package com.swnat.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.*;

import java.io.InputStream;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.swnat.TestUtils;
import com.swnat.service.ChallengeService;

@RunWith(SpringJUnit4ClassRunner.class) // provide the spring context for the test
@SpringBootTest
@AutoConfigureMockMvc//provide configuration for the MockMvc
public class UploadControllerTest {	
    @Autowired
    private MockMvc mockMvc;//provide Spring MVC infrastructure without starting server.

    @MockBean
    private UploadController uploadcontroller;
    
    @Autowired
    private WebApplicationContext webApplicationContext;
    
    @Before
    public void setUp() {
        //lets the Spring know that we want a WebApplicationContext loaded for the project
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
    
    @Test
    public void singleFileUploadTest() throws Exception {
	
	  MockMultipartFile multipartFile = new MockMultipartFile("file", "test.jpg",
		        "image/jpeg", "test image content".getBytes());
	  
	  String url = "/api/v1/uploads/upload";
	  
	  MvcResult result = mockMvc.perform(MockMvcRequestBuilders.multipart(url)
                        .file(multipartFile)
                        .param("file", "test.png")).andReturn();
	  
	  // verify status post call
	  int status = result.getResponse().getStatus();
	  assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
    	
    	
    }

} 
