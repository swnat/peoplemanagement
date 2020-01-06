package com.swnat.security;

import java.io.Serializable;

public class LoginRequest implements Serializable {

    private static final long serialVersionUID = -5853962748991999429L;

    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
