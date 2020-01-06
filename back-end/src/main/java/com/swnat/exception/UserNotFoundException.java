package com.swnat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User don't exist")
public class UserNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1709513306241806460L;

    public UserNotFoundException() { super("User not found"); }
}
