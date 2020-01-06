package com.swnat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Contraseña no valida")
public class InvalidPasswordException extends RuntimeException {

    private static final long serialVersionUID = 6819016883347357936L;

    public InvalidPasswordException() { super("La contraseña actual no es válida"); }
}
