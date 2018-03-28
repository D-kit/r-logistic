package ru.dkit.real.logistic.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.dkit.real.logistic.RouteListManager;
import ru.dkit.real.logistic.entities.routes.RouteList;

@RestController
@RequestMapping(value = "/api/routelist")
@SuppressWarnings("unused")
public class RouteListController {

  private final RouteListManager routeListManager;

  @Autowired
  public RouteListController(RouteListManager routeListManager) {
    this.routeListManager = routeListManager;
  }

  @PostMapping(value = "", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
  public RouteList create(@RequestBody RouteList rl) {
    return routeListManager.create(rl);
  }

  @GetMapping(value = "/page", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
  public Page<RouteList> read(Pageable pageable) {
    return routeListManager.readPage(pageable);
  }

  @GetMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
  public RouteList get(@PathVariable Long id) {
    return routeListManager.read(id);
  }

  @PutMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
  public RouteList update(@PathVariable Long id, @RequestBody RouteList rl) {
    return routeListManager.update(rl);
  }

  @DeleteMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_JSON_UTF8_VALUE})
  public void delete(@PathVariable Long id) {
    routeListManager.delete(id);
  }
}