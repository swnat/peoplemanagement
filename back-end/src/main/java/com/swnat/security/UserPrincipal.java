package com.swnat.security;

import com.swnat.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class UserPrincipal implements UserDetails {

    private Long idUser;

    private String username;

    private String name;

    private String lastname;

    private String password;

    private String email;

    private final Collection<? extends GrantedAuthority> authorities;

    private boolean enabled;

    private UserPrincipal(Long idUser, String name, String lastname, String username, String password,
                             String email, Collection<? extends GrantedAuthority> authorities,
                             boolean enabled) {
        this.idUser = idUser;
        this.name = name;
        this.username = username;
        this.lastname = lastname;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
        this.enabled = enabled;
    }

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRol()));

        return new UserPrincipal(
                user.getIdUser(),
                user.getName(),
                user.getLastname(),
                user.getEmail(),
                user.getPassword(),
                user.getEmail(),
                authorities,
                user.isActive()
        );
    }

    public Long getIdUser() {
        return idUser;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public String getLastname() {
        return lastname;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(idUser, that.idUser);
    }

    @Override
    public int hashCode() {

        return Objects.hash(idUser);
    }
}