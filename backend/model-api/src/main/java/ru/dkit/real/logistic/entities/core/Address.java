package ru.dkit.real.logistic.entities.core;

import javax.persistence.*;

@Entity
@Table(name = "address")
@SequenceGenerator(name = "entity_id_gen", sequenceName = "ADDRESS_SEQ", allocationSize = 1)
@SuppressWarnings("unused")
public class Address extends AbstractEntity {

  @Column(name = "address", nullable = false)
  private String fullAddress;

  public Address() {
  }

  public String getFullAddress() {
    return fullAddress;
  }

  public void setFullAddress(String fullAddress) {
    this.fullAddress = fullAddress;
  }

  @Override
  public String toString() {
    return (fullAddress != null && !fullAddress.isEmpty()) ? fullAddress : "Нет адреса";
  }
}