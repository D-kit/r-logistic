package ru.dkit.real.logistic.controllers;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.security.Principal;

@RestController
@RequestMapping(value = "/api/user")
@SuppressWarnings("unused")
public class UserController {

  @GetMapping(value = "/name", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
  public String myName(Principal user) {
    return user == null ? "no auth!" : user.getName();
  }
}
