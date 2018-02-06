package ru.dkit.real.logistic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dkit.real.logistic.entities.routes.Route;

public interface RouteRepo extends JpaRepository<Route, Long> {
}