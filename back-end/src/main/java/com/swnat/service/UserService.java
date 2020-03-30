package com.swnat.service;

import com.swnat.model.User;

import com.swnat.dto.MessageDTO;
import com.swnat.dto.PaginationResponse;

public interface UserService extends IGenericService<User, Long> {
    
    /**
     * Bring the records that enter the filter
     * @param filter
     * @param page
     * @param size
     * @return
     */
    PaginationResponse<User> findByFilter(String filter, int page, int size);

    /**
     * Edit a user, ignoring the password
     * @param id
     * @param user
     * @return
     */
    User editUser(Long id, User user);

    MessageDTO editUserPassword(Long id, String password);
}
