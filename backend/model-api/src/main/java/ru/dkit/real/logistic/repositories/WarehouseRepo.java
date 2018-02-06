package ru.dkit.real.logistic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dkit.real.logistic.entities.routes.Warehouse;

public interface WarehouseRepo extends JpaRepository<Warehouse, Long> {
}