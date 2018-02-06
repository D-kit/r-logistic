package ru.dkit.real.logistic.entities.core;

import javax.persistence.*;

@Entity
@Table(name = "organization")
@SequenceGenerator(name = "entity_id_gen", sequenceName = "ORGANIZATION_SEQ", allocationSize = 1)
@SuppressWarnings("unused")
public class Organization extends AbstractEntity {

  @Column(name = "name", unique = true, nullable = false)
  private String name;
  @Column(name = "contacts")
  private String contacts;
  @Column(name = "comment")
  private String comment;
  @ManyToOne
  @JoinColumn(name = "id_address")
  private Address address;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getContacts() {
    return contacts;
  }

  public void setContacts(String contacts) {
    this.contacts = contacts;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }

  @Override
  public String toString() {
    return "\"" + name + "\"";
  }
}