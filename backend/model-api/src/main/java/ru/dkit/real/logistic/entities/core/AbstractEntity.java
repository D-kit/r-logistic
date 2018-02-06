package ru.dkit.real.logistic.entities.core;

import javax.persistence.*;

@MappedSuperclass
@SuppressWarnings("unused")
public abstract class AbstractEntity implements Identifiable {

  @Id
  @GeneratedValue(generator = "entity_id_gen", strategy = GenerationType.SEQUENCE)
  private Long id;
  @Version
  private Long version;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getVersion() {
    return version;
  }

  public void setVersion(Long version) {
    this.version = version;
  }
}