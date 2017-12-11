package ru.dkit.real.logistic;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class IndexController {
  @GetMapping(value = "/", produces = "text/html; charset=utf8")
  @SuppressWarnings("unused")
  public ModelAndView index() {
    return new ModelAndView("index.html");
  }
}