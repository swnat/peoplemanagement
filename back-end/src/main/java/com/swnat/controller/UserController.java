package com.swnat.controller;

import com.swnat.model.User;
import com.swnat.dto.MessageDTO;
import com.swnat.dto.PaginationResponse;
import com.swnat.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.models.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Get user data", notes = "Get data from one user per identifier")
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getOne(id);
    }

    @ApiOperation(value = "Get list users", notes = "Get list of users by filtering with text and returning paged")
    @GetMapping("/")
    public PaginationResponse<User> getAllUsers(@RequestParam(value = "filter", required = false) String filter, @RequestParam("page") int page, @RequestParam("size") int size) {
        return userService.findByFilter(filter, page, size);
    }

    @ApiOperation(value = "Create a user", notes = "Create a new user")
    @PostMapping("/")
    public User saveUser(@Valid @RequestBody User user) {
        return userService.add(user);
    }

    @ApiOperation(value = "Edit a user", notes = "Update data of an existing user without changing the password")
    @PutMapping("/{id}")
    public User updateUser(@Valid @RequestBody User user, @PathVariable Long id) {
        return userService.editUser(id, user);
    }

    @ApiOperation(value = "Change Password", notes = "Update a user's password")
    @PutMapping("/{id}/change-password")
    public ResponseEntity updatePassword(@Valid @RequestBody String password, @PathVariable Long id) {
        try{
            return ResponseEntity.status(HttpStatus.OK).body(userService.editUserPassword(id, password));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(new MessageDTO("error"));
        }
    }
    
}
