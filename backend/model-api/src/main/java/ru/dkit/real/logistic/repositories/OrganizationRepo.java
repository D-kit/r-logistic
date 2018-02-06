package ru.dkit.real.logistic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.dkit.real.logistic.entities.core.Organization;

public interface OrganizationRepo extends JpaRepository<Organization, Long> {
}