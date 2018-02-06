package ru.dkit.real.logistic.entities.routes;

import ru.dkit.real.logistic.entities.core.AbstractEntity;
import ru.dkit.real.logistic.entities.core.Address;
import ru.dkit.real.logistic.entities.core.Person;

import javax.persistence.*;

@Entity
@Table(name = "warehouse")
@SequenceGenerator(name = "entity_id_gen", sequenceName = "WAREHOUSE_SEQ", allocationSize = 1)
@SuppressWarnings("unused")
public class Warehouse extends AbstractEntity {

  @ManyToOne
  @JoinColumn(name = "id_headman", nullable = false)
  private Person headman;
  @ManyToOne
  @JoinColumn(name = "id_address", nullable = false)
  private Address address;
  @Column(name = "comment")
  private String comment;

  public Warehouse() {
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Person getHeadman() {
    return headman;
  }

  public void setHeadman(Person headman) {
    this.headman = headman;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }
}