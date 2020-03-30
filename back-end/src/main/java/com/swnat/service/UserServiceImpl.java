package com.swnat.service;

import com.swnat.model.User;

import com.swnat.dto.MessageDTO;
import com.swnat.dto.PaginationResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.swnat.repository.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserServiceImpl extends GenericService<User, Long> implements UserService {

    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public JpaRepository<User, Long> getRepository() {
        return this.userRepository;
    }

    @Override
    public PaginationResponse<User> findByFilter(String filter, int page, int size) {
        Page<User> searchResult;
        PageRequest pageRequest = PageRequest.of(page, size);

        if (filter == null || filter.isEmpty()) {
            searchResult = userRepository.findAll(pageRequest);
        } else {
            searchResult = userRepository.findAllByNameContainsOrLastnameContains(filter, pageRequest);
        }

        PaginationResponse<User> response = new PaginationResponse<>();
        response.setContent(searchResult.getContent());
        response.setTotalCount(searchResult.getTotalElements());
        return response;
    }

    @Override
    public User editUser(Long id, User user){
        User userlogged = this.getOne(id);
        userlogged.setName(user.getName());
        userlogged.setLastname(user.getLastname());
        userlogged.setEmail(user.getEmail());
        userlogged.setRol(user.getRol());
        userlogged.setActive(user.isActive());

        return this.update(id, userlogged);

    }

    @Override  
    public MessageDTO editUserPassword(Long id, String password){
        User user = this.getOne(id);
        user.setPassword(password);
        this.update(id, user);
        return new MessageDTO("success");
    }

}