package com.swnat.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.swnat.TestUtils;
import com.swnat.model.Challenge;
import com.swnat.model.User;
import com.swnat.service.CandidateService;
import com.swnat.service.UserService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserController user;
    
    @MockBean
    private UserService usermanager;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void getUserByIdTest() throws Exception
    {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(TestUtils.USER_URL).
        contentType(MediaType.APPLICATION_JSON_UTF8).accept(MediaType.APPLICATION_JSON_UTF8)).
        andReturn();
        
        int status = result.getResponse().getStatus();
        // assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
    }
    @Test
    public void saveUserTest()throws Exception{
    	User user = TestUtils.buildUserTest();
    	when(usermanager.add(any(User.class))).
    	thenReturn(user);
    	

        String requestJson= TestUtils.jsonStringFromObject(user);

        // execute
         MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(TestUtils.USER_URL).
         contentType(MediaType.APPLICATION_JSON_UTF8).
         accept(MediaType.APPLICATION_JSON_UTF8).
         content(requestJson)).andReturn();


        // verify status post call
        int status = result.getResponse().getStatus();
        assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);
                
        // verify that service method was called once
        verify(usermanager).add(any(User.class));
    }
    
    @Test
    public void updateUserTest() throws Exception{
    	User user = TestUtils.buildUserTest();
    	when(usermanager.add(any(User.class))).
    	thenReturn(user);
    	

        String requestJson= TestUtils.jsonStringFromObject(user);

        // execute
         MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(TestUtils.USER_URL+"{id]", user.getIdUser()).
         contentType(MediaType.APPLICATION_JSON_UTF8).
         accept(MediaType.APPLICATION_JSON_UTF8).
         content(requestJson)).andReturn();


        // verify status post call
        int status = result.getResponse().getStatus();
        // assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);

    }
    
    @Test
    public void getUserTest() throws Exception{
    	User user = TestUtils.buildUserTest();
    	when(usermanager.add(any(User.class))).
    	thenReturn(user);
    	
        String requestJson= TestUtils.jsonStringFromObject(user);

        // execute
         MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post(TestUtils.USER_URL+"{id}", user.getIdUser()).
         contentType(MediaType.APPLICATION_JSON_UTF8).
         accept(MediaType.APPLICATION_JSON_UTF8).
         content(requestJson)).andReturn();
         
         int status = result.getResponse().getStatus();
         //assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);     
    }
}