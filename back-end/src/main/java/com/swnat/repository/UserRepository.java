package com.swnat.repository;

import com.swnat.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     *Search user by email
     *
     * @param email
     * @return {@link User}
     */
    Optional<User> findByEmail(String email);

    /**
     * Search users by name, lastname o email.
     *
     * @param name
     * @param lastname
     * @param email
     * @param pageable
     * @return {@link Page <User>}
     */
    Page<User> findAllByNameContainsOrLastnameContainsOrEmailContains(String name, String lastname,
                                                                                       String email,
                                                                                       Pageable pageable);
    /**
     * Obtain the list of applicants by any of the following criteria: name, lastname
     *
     * @return {@link Page <User>}
     */
    @Query("select p from User p where concat(name,' ',lastname) like %:filtro% or email like %:filtro% or rol like %:filtro%")
    Page<User> findAllByNameContainsOrLastnameContains(@Param("filtro") String name, Pageable pageable);


}