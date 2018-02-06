package ru.dkit.real.logistic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dkit.real.logistic.entities.routes.RouteList;

public interface RouteListRepo extends JpaRepository<RouteList, Long> {
}