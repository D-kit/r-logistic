package ru.dkit.real.logistic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dkit.real.logistic.entities.core.Person;

public interface PersonRepo extends JpaRepository<Person, Long> {
}