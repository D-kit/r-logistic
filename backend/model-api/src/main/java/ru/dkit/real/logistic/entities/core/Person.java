package ru.dkit.real.logistic.entities.core;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Date;

import static ru.dkit.real.logistic.utils.StringUtils.*;

@Entity
@Table(name = "person")
@SequenceGenerator(name = "entity_id_gen", sequenceName = "PERSON_SEQ", allocationSize = 1)
@SuppressWarnings("unused")
public class Person extends AbstractEntity {

  @Column(name = "name", nullable = false)
  private String name;
  @Column(name = "surname", nullable = false)
  private String surname;
  @Column(name = "patronymic")
  private String patronymic;
  @Column(name = "birthday", nullable = false)
  private Date birthday;
  @Column(name = "contacts")
  private String contacts;
  @Column(name = "comment")
  private String comment;
  @Column(name = "profession")
  private String profession;

  public Person() {
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getSurname() {
    return surname;
  }

  public void setSurname(String surname) {
    this.surname = surname;
  }

  public String getPatronymic() {
    return patronymic;
  }

  public void setPatronymic(String patronymic) {
    this.patronymic = patronymic;
  }

  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
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

  public String getProfession() {
    return profession;
  }

  public void setProfession(String profession) {
    this.profession = profession;
  }

  @Override
  public String toString() {
    return (notEmpty.test(this.surname) ? upFirstChar.apply(this.surname) : "")
        + (notEmpty.test(this.name) ? " " + upFirstChar.apply(this.name) : "")
        + (notEmpty.test(this.patronymic) ? " " + upFirstChar.apply(this.patronymic) : "");
  }

  public String toShortString() {
    return (notEmpty.test(this.surname) ? upFirstChar.apply(this.surname) : "")
        + (notEmpty.test(this.name) ? " " + getUpFirstChar.apply(this.name) + "." : "")
        + (notEmpty.test(this.patronymic) ? " " + getUpFirstChar.apply(this.patronymic) + "." : "");
  }
}