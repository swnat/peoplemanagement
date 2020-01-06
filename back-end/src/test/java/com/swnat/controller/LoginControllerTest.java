package com.swnat.controller;

import com.swnat.TestUtils;
import com.swnat.model.User;
import com.swnat.security.controller.AuthController;
import com.swnat.service.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class) // provide the spring context for the test
@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc // provide configuration for the MockMvc

public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthController authcontroller;

    @MockBean
    private UserService userService;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Before
    public void setUp() {
        // lets the Spring know that we want a WebApplicationContext loaded for the project
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void shouldAllowAccessToAuthenticatedUsers() throws Exception {
        // prepare data and mock's behaviour
        User user = TestUtils.buildLoginTest();
        when(userService.add(any(User.class))).thenReturn(user);

        String requestJson = TestUtils.jsonStringFromObject(user);
        // execute

        MvcResult result = mockMvc
                .perform(MockMvcRequestBuilders.post(TestUtils.LOGIN_URL)
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(requestJson))
                .andReturn();

        // verify status post call
        int status = result.getResponse().getStatus();
        //assertEquals("Incorrect Response Status", HttpStatus.OK.value(), status);

        // verify that service method was called once
        //verify(userService).add(any(User.class));

    }

}