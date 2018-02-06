package ru.dkit.real.logistic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dkit.real.logistic.entities.core.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {
}